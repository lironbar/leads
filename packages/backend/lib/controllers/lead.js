const Lead = require('../models/lead');
const Interface = require('../models/interface');
const Campaign = require('../models/campaign');
const { http, email, date, enums } = require('../utils');

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
        res.status(200);
        res.json(lead);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findByCampaign = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        const userRole = req.session.user.role;
        switch (userRole) {
            case enums.userRoles.admin:
                if (params.affiliateIds) {
                    params.affiliateIds = params.affiliateIds.split(',');
                }
                if (params.publisherIds) {
                    params.publisherIds = params.publisherIds.split(',');
                }
                break;
            case enums.userRoles.affiliate:
                params.affiliateIds = [req.session.user._id];
                break;
            case enums.userRoles.publisher:
                params.publisherIds = [req.session.user._id];
                break;
        }
        const leads = await findByParams(params);
        res.status(200);
        res.json(leads);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.send = async (req, res) => {
    try {
        const campaignId = req.params.campaignId;
        const affiliateId = req.body.affiliateId;
        let payload = req.body.lead;

        const iface = await Interface.findOne({ campaignId });
        const campaign = await Campaign.findOne({ _id: campaignId });

        const leadFields = {};
        const fieldsSchema = iface.fields.toObject();

        fieldsSchema.forEach(schema => {
            if (schema.isStatic) {
                return leadFields[schema.name] = schema.value;
            }

            const field = payload[schema.name];
            if (!field && schema.isRequired) {
                throw new Error(`missing required field ${schema.name} for lead`);
            }

            if (field.length > 250) {
                throw new Error(`field ${schema.name} is over 250 characters`);
            }

            leadFields[schema.name] = field;
        });

        // validate max leads
        const sentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId });
        // if (sentLeadsCount >= campaign.maxLeads) {
        //     throw 'max leads for campaign';
        // }

        // validate daily max leads
        const dailySentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId, timestamp: { $gt: date.startOfDay() } });
        // if (dailySentLeadsCount >= campaign.maxDailyLeads) {
        //     throw 'max daily leads for campaign';
        // }

        // create lead
        const lead = new Lead({
            raw: payload, // raw payload provided by the affiliate
            payload: leadFields, // validated payload to send to campaign owner
            price: campaign.price,
            interfaceId: iface._id,
            affiliate: affiliateId,
            publisher: campaign.publisherId,
            campaign: campaignId
        })
        await lead.save();

        // send the lead
        let success = false, message = "", results = {};
        switch (iface.type) {
            case 'http':
                payload = JSON.stringify(payload);
                const options = { headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length }, timeout: 5000 };
                const { statusCode, statusMessage } = await http.request(iface.url, options, payload);

                success = (statusCode >= 200 && statusCode <= 299);
                message = statusMessage;
                results = { statusCode, statusMessage };
                break;
            case 'email':
                const text = Object.keys(payload).map(k => `${k}: ${payload[k]}`).join('\n');
                const { response, messageId, messageSize, accepted, rejected } = await email.send(iface.email, `New lead for campaign ${campaign.name}`, text);

                success = response.startsWith('250');
                message = response;
                results = { response, messageId, messageSize, accepted, rejected };
                break;
        }

        // handle results
        await Lead.updateOne({ _id: lead._id }, { success, response: results, timestamp: Date.now() });
        if (!success) {
            throw `failed with message ${message}`;
        }

        res.status(200);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};