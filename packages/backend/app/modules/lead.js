const Lead = require('../models/lead');
const Interface = require('./interface');
const Campaign = require('./campaign');
const MongooseEntity = require('./mongoose-entity');
const { http, date } = global.App.Utils;

class LeadModule extends MongooseEntity {

    constructor() { super(); }

    static async send(campaignId, { affiliateId, lead: payload }) {
        try {
            const iface = await Interface.getByCampaign(campaignId);
            const campaign = await Campaign.findOne({ _id: campaignId });

            // validate max leads
            const sentLeadsCount = await Lead.estimatedDocumentCount({ sent: true, campaignId });
            if (sentLeadsCount >= campaign.maxLeads) {
                throw 'Max leads for campaign';
            }

            // validate daily max leads
            const dailySentLeadsCount = await Lead.estimatedDocumentCount({ sent: true, campaignId, timestamp: { $gt: date.startOfDay() } });
            if (dailySentLeadsCount >= campaign.maxDailyLeads) {
                throw 'Max daily leads for campaign';
            }

            // create lead
            let lead = await new Lead({ payload, price: campaign.price, interfaceId: iface._id, affiliateId, campaignId }).save();

            // send the lead
            switch (iface.type) {
                case 'http':
                    payload = JSON.stringify(payload);
                    const options = { headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length } };
                    const { statusCode, statusMessage } = await http.request(iface.url, options, payload);
                    if (statusCode >= 200 && statusCode <= 399) {
                        const { nModified } = await Lead.updateOne({ _id: lead._id }, { sent: true, response: { statusCode, statusMessage } });
                        return statusMessage;
                    } else {
                        throw 'Failed to send lead';
                    }
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LeadModule;