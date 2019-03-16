const User = require('../user/user');

// bind to User model
const Affiliate = User.Model;
class AffiliateModule extends User.constructor {

    constructor() { super(Affiliate); }

    static get Name() {
        return 'Affiliate';
    }

    find() {
        return Affiliate.find({ role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1 }).populate('campaigns');
    }

    findOne(id) {
        return Affiliate.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1 }).populate('campaigns');
    }

    async getCampaigns(id) {
        try {
            const affiliate = await Affiliate.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 0, campaigns: 1 }).populate('campaigns');
            if (!affiliate) {
                return affiliate;
            }
            return affiliate.campaigns;
        } catch (err) {
            throw err;
        }
    }

    async joinCampaign(id, campaignId) {
        try {
            const results = await Affiliate.update({ _id: id, role: 'AFFILIATE', campaigns: { $nin: [campaignId] } }, { $push: { campaigns: campaignId } });
            if (!results.nModified) {
                throw 'Failed to join campaign';
            }
        } catch (err) {
            throw (err);
        }
    }

    async leaveCampaign(id, campaignId) {
        try {
            const results = await Affiliate.update({ _id: id, role: 'AFFILIATE' }, { $pull: { campaigns: campaignId } });
            if (!results.nModified) {
                throw 'Failed to leave campaign';
            }
        } catch (err) {
            throw (err);
        }
    }
}

const instance = new AffiliateModule();
module.exports = instance;