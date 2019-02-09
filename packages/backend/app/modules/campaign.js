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

    static findUnassigned(affiliateIds) {
        return Campaign.find({ affiliates: { $nin: Array.isArray(affiliateIds) ? affiliateIds : [affiliateIds] } }).populate('affiliates');
    }

}

module.exports = CampaignModule;