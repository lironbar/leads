const Campaign = require('../models/campaign');
const MongooseEntity = require('./mongoose-entity');

class CampaignModule extends MongooseEntity {
    constructor() { }

    static get Name() {
        return 'Campaign';
    }

    static create(obj) {
        return new Campaign(obj).save();
    }

    static find() {
        return Campaign.find().populate('affiliates');
    }

    static findOne(id) {
        return Campaign.findOne({ _id: id }).populate('affiliates');
    }

    static updateOne(id, obj) {
        return Campaign.updateOne({ _id: id }, obj, { new: true });
    }

    static deleteOne(id) {
        return Campaign.deleteOne({ _id: id });
    }

    static getPublisherCampaigns(publisherId) {
        return Campaign.find({ publisherId }).populate('affiliates');
    }

    static async findUnassigned(affiliateId) {
        try {
            const campaigns = await Campaign.find().populate('affiliates');
            return campaigns.filter(campaign => {
                const affiliates = campaign.affiliates.map(a => a._id.toString());
                return affiliates.indexOf(affiliateId) === -1;
            });
        } catch (err) {
            throw err;
        }
    }

}

module.exports = CampaignModule;