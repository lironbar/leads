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

    const leadFields = {};
    const fieldsSchema = iface.fields.toObject();

    try {
        fieldsSchema.forEach(schema => {
            if (schema.isStatic) {
                return leadFields[schema.name] = schema.value;
            }

            const field = payload[schema.name];
            if (!field && schema.isRequired) {
                throw new Error(`missing required field ${schema.name}`);
            }

            if (field.length > 250) {
                throw new Error(`field ${schema.name} is over 250 characters`);
            }

            leadFields[schema.name] = field;
        });
    } catch (err) {
        console.log(`refused to send invalid lead - ${err}`);
        res.status(400);
        return res.end(err);
    }


    // validate max leads
    const sentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId });
    if (sentLeadsCount >= campaign.maxLeads) {
        console.log(`refused to send lead - max leads for campaigns`);
        res.status(400);
        return res.end('max leads for campaign');
    }

    // validate daily max leads
    const dailySentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId, timestamp: { $gt: date.startOfDay() } });
    if (dailySentLeadsCount >= campaign.maxDailyLeads) {
        console.log(`refused to send lead - max daily leads for campaigns`);
        res.status(400);
        return res.end('max daily leads for campaign');
    }

    // create lead
    let lead;
    try {
        lead = new Lead({
            raw: payload, // raw payload provided by the affiliate
            payload: leadFields, // validated payload to send to campaign owner
            price: campaign.price,
            interfaceId: iface._id,
            affiliate: affiliateId,
            publisher: campaign.publisherId,
            campaign: campaignId
        })
        await lead.save();
    } catch (err) {
        console.error(`failed to create lead - ${err}`);
        res.status(500);
        return res.send(`creation failed`);
    }

    // send the lead
    let success = false, message = "", results = {};
    try {
        switch (iface.type) {
            case 'http':
                const { statusCode, statusMessage } = await http.request({
                    url: iface.url,
                    method: iface.method,
                    body: leadFields,
                    json: true,
                    timeout: 5000
                });

                success = (statusCode >= 200 && statusCode <= 299);
                message = statusMessage;
                results = { statusCode, statusMessage };
                break;
            case 'email':
                const text = Object.keys(leadFields).map(k => `${k}: ${leadFields[k]}`).join('\n');
                const { response, messageId, messageSize, accepted, rejected } = await email.send(iface.email, `New lead for campaign ${campaign.name}`, text);

                success = response.startsWith('250');
                message = response;
                results = { response, messageId, messageSize, accepted, rejected };
                break;
        }
    } catch (err) {
        console.error(`interface error while sending lead by ${req.session.user.name}`, err);
    }

    if (success) {
        console.log(`sent lead ${lead._id} by ${req.session.user.name} for campaign ${campaignId}`);
        res.status(200);
        res.json(result);
    } else {
        console.error(`failed to send lead ${lead._id} - ${JSON.stringify(results)}`);
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