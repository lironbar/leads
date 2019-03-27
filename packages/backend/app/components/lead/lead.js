const Lead = require('./model');
const { http, email, date } = global.App.Utils;
const Interface = require('../interface/interface');
const Campaign = require('../campaign/campaign');
const MongooseEntity = require('../mongoose-entity/mongoose-entity');

class LeadModule extends MongooseEntity {

    constructor() { super(Lead); }

    static get Name() {
        return 'Lead';
    }

    async findByParams({ leadId, campaignId, publisherIds, affiliateIds, success, approved }) {
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
        return Lead.find(lookup).populate({ path: 'affiliate', select: { _id: 1, name: 1, email: 1 } });
    }

    async send(campaignId, { affiliateId, lead: payload }) {
        const iface = await Interface.getByCampaign(campaignId);
        const campaign = await Campaign.findOne({ _id: campaignId });

        // validate max leads
        const sentLeadsCount = await super.estimatedDocumentCount({ success: true, campaignId });
        if (sentLeadsCount >= campaign.maxLeads) {
            throw 'max leads for campaign';
        }

        // validate daily max leads
        const dailySentLeadsCount = await super.estimatedDocumentCount({ success: true, campaignId, timestamp: { $gt: date.startOfDay() } });
        if (dailySentLeadsCount >= campaign.maxDailyLeads) {
            throw 'max daily leads for campaign';
        }

        // create lead
        const lead = await super.create({
            payload,
            price: campaign.price,
            interfaceId: iface._id,
            affiliate: affiliateId,
            publisher: campaign.publisherId,
            campaign: campaignId
        });

        // send the lead
        let success = false, message = "", results = {};
        switch (iface.type) {
            case 'http':
                payload = JSON.stringify(payload);
                const options = { headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length } };
                const { statusCode, statusMessage } = await http.request(iface.url, options, payload);

                success = (statusCode >= 200 && statusCode <= 399);
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
        await super.updateOne({ _id: lead._id }, { success, response: results, timestamp: Date.now() });
        if (success) {
            return message;
        }
        throw `failed with message ${message}`;
    }
}

const instance = new LeadModule();
module.exports = instance;