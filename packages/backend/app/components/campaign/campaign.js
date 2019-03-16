const Campaign = require('./model');
const MongooseEntity = require('../mongoose-entity/mongoose-entity');

class CampaignModule extends MongooseEntity {

    constructor() { super(Campaign); }

    static get Name() {
        return 'Campaign';
    }

    create(obj) {
        return new Campaign(obj).save();
    }

    find() {
        return Campaign.find().populate('affiliates');
    }

    findOne(id) {
        return Campaign.findOne({ _id: id }).populate('affiliates');
    }

    updateOne(id, obj) {
        return Campaign.updateOne({ _id: id }, obj, { new: true });
    }

    deleteOne(id) {
        return Campaign.deleteOne({ _id: id });
    }

    getPublisherCampaigns(publisherId) {
        return Campaign.find({ publisherId }).populate('affiliates');
    }

    async findUnassigned(affiliateId) {
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

const instance = new CampaignModule();
module.exports = instance;