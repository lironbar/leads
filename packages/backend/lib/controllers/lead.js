const Lead = require('../models/lead');
const Interface = require('../models/interface');
const Campaign = require('../models/campaign');
const { http, email, date } = require('../utils');

async function findByParams({ leadId, campaignId, publisherIds, affiliateIds, success, approved }) {
    const lookup = {};
    if (leadId) {
        lookup._id = leadId;
    }
    if (success) {
        lookup.success = success === 'true';
    }
    if (approved) {
        lookup.approved = approved === 'true';
    }
    if (publisherIds) {
        lookup.publisher = { $in: publisherIds };
    }
    if (affiliateIds) {
        lookup.affiliate = { $in: affiliateIds };
    }
    if (campaignId) {
        lookup.campaign = campaignId;
    }
    return await Lead.find(lookup).populate({ path: 'affiliate', select: { _id: 1, name: 1, email: 1 } });
}

async function isCampaignAcceptingLeads(campaign, phoneNumber) {
    const { _id: id, publisherId } = campaign;

    // is campaign active
    if (!campaign.active) {
        return 'campaign is not active';
    }
    // validate max leads
    const sentLeadsCount = await Lead.estimatedDocumentCount({ success: true, id });
    if (sentLeadsCount >= campaign.maxLeads) {
        return 'max leads for campaign';
    }
    // validate daily max leads
    const dailySentLeadsCount = await Lead.estimatedDocumentCount({ success: true, id, timestamp: { $gt: date.startOfDay() } });
    if (dailySentLeadsCount >= campaign.maxDailyLeads) {
        return 'max daily leads for campaigns';
    }
    // validate 3Mths elpased since phone sent to publisher (3Mths should be configurable)
    const threeMonthsAgo = Date.now() - (1000 * 60 * 60 * 24 * 30 * 3);
    const inFreezePeriod = (await Lead.findOne({ 'meta.phoneNumber': phoneNumber, publisherId, timestamp: { $gt: threeMonthsAgo }, success: true }));
    if (inFreezePeriod) {
        return 'the publisher is currently not accepting this phone number';
    }

    return true;
}

async function composeLead(raw, fieldsSchema) {
    const composed = {};
    const phoneNumber = raw[fieldsSchema.find(f => f.isPhoneNumber).name];
    if (!phoneNumber) {
        throw new Error(`no phone number found in lead`);
    }
    const name = raw[fieldsSchema.find(f => f.isName).name];
    if (!name) {
        throw new Error(`no name found in lead`);
    }
    fieldsSchema.forEach(schema => {
        if (schema.isStatic) {
            return composed[schema.name] = schema.value;
        }
        const fieldName = schema.name, field = raw[fieldName];
        if (schema.isRequired && !field) {
            throw new Error(`missing required field ${fieldName}`);
        }
        if (field.length > 250) {
            throw new Error(`field ${fieldName} is over 250 characters`);
        }
        composed[fieldName] = field;
    });
    return {
        meta: { name, phoneNumber },
        composed
    };
}

async function sendLead(iface, campaign, payload) {
    switch (iface.type) {
        case 'http':
            const { statusCode, statusMessage } = await http.request({
                url: iface.url,
                method: iface.method,
                body: payload,
                json: true,
                timeout: 5000
            });

            return {
                success: (statusCode >= 200 && statusCode <= 299),
                message: statusMessage,
                info: { statusMessage, statusCode }
            };
        case 'email':
            const text = Object.keys(payload).map(k => `${k}: ${payload[k]}`).join('\n');
            const { response, messageId, messageSize, accepted, rejected } = await email.send(iface.email, `New lead for campaign ${campaign.name}`, text);

            return {
                success: (response.startsWith('250')),
                message: response,
                info: { response, messageId, messageSize, accepted, rejected }
            };
    }
}

module.exports.findOne = async (req, res) => {
    try {
        const lead = await Lead.findOne({ _id: req.params });

        if (!lead) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(lead);
    } catch (err) {
        console.error(`error finding lead - ${err}`);
        res.status(500);
        res.send();
    }
};

module.exports.findByCampaign = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };

        if (req.session.isAffiliate) {
            params.affiliateIds = [req.session.user._id];
        } else if (req.session.isPublisher) {
            params.publisherIds = [req.session.user._id];
        } else if (req.session.isAdmin) {
            if (params.affiliateIds) {
                params.affiliateIds = params.affiliateIds.split(',');
            }
            if (params.publisherIds) {
                params.publisherIds = params.publisherIds.split(',');
            }
        }

        const leads = await findByParams(params);
        res.status(200);
        res.json(leads);
    } catch (err) {
        console.error(`error finding lead by campaign - ${err}`);
        res.status(500);
        return res.send();
    }
};

module.exports.send = async (req, res) => {
    const campaignId = req.params.campaignId;
    const affiliateId = req.body.affiliateId;
    let payload = req.body.lead;

    console.log(`handling new lead "${JSON.stringify(payload).substr(0, 50)}..." by ${req.session.user.name} for campaign ${campaignId}`);

    let iface, campaign;
    try {
        campaign = await Campaign.findOne({ _id: campaignId });
        iface = await Interface.findOne({ campaignId });
    } catch (err) {
        console.error(`failed to send lead - error loading campaign ${campaignId}`, err);
        res.status(500);
        return res.end();
    }

    if (!campaign || !iface) {
        console.error(`failed to send lead - campaign not found ${campaignId}`);
        res.status(400);
        return res.end(`campaign not found`);
    }

    // create a validated and ready-to-send lead object
    let meta, composed;
    try {
        const results = await composeLead(payload, iface.fields.toObject());
        meta = results.meta;
        composed = results.composed
    } catch (err) {
        console.log(`refused to send lead - composing and validations error "${err}"`);
        res.status(400);
        return res.end(err);
    }

    // verify leads can be sent to this campaign
    try {
        const isAcceptingLeadsResult = await isCampaignAcceptingLeads(campaign, meta.phoneNumber);
        if (isAcceptingLeadsResult !== true) {
            console.info(`refused to send lead - ${isAcceptingLeadsResult}`);
            res.status(400);
            return res.end(isAcceptingLeadsResult);
        }
    } catch (err) {
        console.error(`failed to send lead - is campaign accepting leads check error`, err);
        res.status(500);
        return res.end();
    }

    // create lead
    let lead;
    try {
        lead = new Lead({
            meta,
            raw: payload, // raw payload provided by the affiliate
            payload: composed, // validated payload to send to campaign owner
            price: campaign.price,
            interfaceId: iface._id,
            affiliate: affiliateId,
            publisher: campaign.publisherId,
            campaign: campaignId
        });
        await lead.save();
    } catch (err) {
        console.error(`failed to create lead - ${err}`);
        res.status(500);
        return res.send(`creation failed`);
    }

    // send the lead
    let results;
    try {
        results = await sendLead(iface, campaign, composed);
    } catch (err) {
        console.error(`interface error while sending lead by ${req.session.user.name}`, err);
    }

    const success = (results && results.success);
    if (success) {
        console.log(`sent lead ${lead._id} by ${req.session.user.name} for campaign ${campaignId}`);
        res.status(200);
        res.json(results);
    } else {
        console.error(`failed to send lead ${lead._id} - results "${JSON.stringify(results)}"`);
        res.status(500);
        res.end();
    }

    // update the lead with the results
    try {
        await Lead.updateOne({ _id: lead._id }, { success, response: results, timestamp: Date.now() });
    } catch (err) {
        console.error(`failed to update results for lead ${lead._id} - success: "${success}" - results: "${JSON.stringify(results)}" - error: "${err}"`);
    }
};

module.exports.approve = async (req, res) => {
    if (req.session.isAdmin !== true) {
        console.warn(`rejecting request to approve leads by a forbidden user ${req.session.user.name}`);
        res.status(403);
        res.end();
        return;
    }

    const publisher = req.params.publisherId;
    const leads = req.body;

    if (!publisher || !leads || (leads instanceof Array && !leads.length)) {
        res.status(400);
        res.end();
        return;
    }

    console.log(`starting update of leads approval status for publisher ${publisher}`);
    const results = { success: false, message: '', data: null };

    // work with array
    if (!leads instanceof Array) {
        leads = [leads];
    }

    // find invalid leads which don't have a proper name and phone
    const invalidLeads = leads.filter(lead => {
        return (!lead.name || !lead.phone ||
            typeof lead.name !== 'string' ||
            (typeof lead.phone !== 'string' && typeof lead.phone !== 'number'));
    });
    if (invalidLeads.length) {
        console.log(`rejecting due to invalid leads`);
        results.message = 'invalid leads';
        results.data = invalidLeads;
        res.status(400);
        res.json(results);
        return;
    }

    // trim fields
    leads.forEach(lead => Object.keys(lead).forEach(k => typeof lead[k] === 'string' ? lead[k] = lead[k].trim() : null));

    // check if any phone exists for yet to be reported leads
    const phones = leads.map(lead => lead.phone);
    const unreported = Lead.find({ approvalReported: null, 'meta.phoneNumber': { $in: phones } });
    if (unreported && unreported.length) {
        console.log(`rejecting due to yet to reported leads`);
        results.message = 'leads sent to phones provided are yet to be reported';
        results.data = unreported;
        res.status(400);
        res.json(results);
        return;
    }

    // update leads with reported data
    const bulkOps = leads.map(lead => {
        return {
            updateOne: {
                filter: {
                    approvalReported: false,
                    'meta.name': lead.name,
                    'meta.phoneNumber': lead.phone,
                },
                update: {
                    approvalReported: true,
                    approved: (lead.isApproved === true || lead.isApproved === "true"),
                    'meta.info': lead.info
                }
            }
        };
    });

    const { modifiedCount } = await Lead.bulkWrite(bulkOps);
    results.success = true;
    results.message = `updated ${modifiedCount} leads`;
    res.status(200);
    res.end();
    console.log(results.message);
};