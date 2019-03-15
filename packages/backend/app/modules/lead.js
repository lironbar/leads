const Lead = require('../models/lead');
const Interface = require('./interface');
const Campaign = require('./campaign');
const MongooseEntity = require('./mongoose-entity');
const { http, email, date } = global.App.Utils;

class LeadModule extends MongooseEntity {

    constructor() { super(); }

    static async send(campaignId, { affiliateId, lead: payload }) {
        const iface = await Interface.getByCampaign(campaignId);
        const campaign = await Campaign.findOne({ _id: campaignId });

        // validate max leads
        const sentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId });
        if (sentLeadsCount >= campaign.maxLeads) {
            throw 'max leads for campaign';
        }

        // validate daily max leads
        const dailySentLeadsCount = await Lead.estimatedDocumentCount({ success: true, campaignId, timestamp: { $gt: date.startOfDay() } });
        if (dailySentLeadsCount >= campaign.maxDailyLeads) {
            throw 'max daily leads for campaign';
        }

        // create lead
        let lead = await new Lead({ payload, price: campaign.price, interfaceId: iface._id, affiliateId, campaignId }).save();

        // send the lead
        let success = false, message = "", results = {};
        switch (iface.type) {
            case 'http':
                payload = JSON.stringify(payload);
                const options = { headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length } };
                const { statusCode, statusMessage } = await http.request(iface.url, options, data);

                success = (statusCode >= 200 && statusCode <= 399);
                message = statusMessage;
                results = { statusCode, statusMessage }
            case 'email':
                const text = Object.keys(payload).map(k => `${k}: ${payload[k]}`).join('\n');
                const { response, messageId, messageSize, accepted, rejected } = await email.send(iface.email, `New lead for campaign ${campaign.name}`, text);

                success = response.startsWith('250');
                message = response;
                results = { response, messageId, messageSize, accepted, rejected };
        }

        // handle results
        await Lead.updateOne({ _id: lead._id }, { success, response: results, timestamp: Date.now() });
        if (success) {
            return message;
        }
        throw `failed with message ${message}`;
    }
}

module.exports = LeadModule;