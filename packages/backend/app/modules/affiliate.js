const UserModule = require('./user');

// bind to User model
const Affiliate = UserModule.Model;
class AffiliateModule extends UserModule {
    constructor() { }

    static get Name() {
        return 'Affiliate';
    }

    static find() {
        return Affiliate.find({ role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1 }).populate('campaigns');
    }

    static findOne(id) {
        return Affiliate.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1 }).populate('campaigns');
    }

    static async getCampaigns(id) {
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

    static async joinCampaign(id, campaignId) {
        try {
            const results = await Affiliate.update({ _id: id, role: 'AFFILIATE', campaigns: { $nin: [campaignId] } }, { $push: { campaigns: campaignId } });
            if (!results.nModified) {
                throw 'Failed to join campaign';
            }
        } catch (err) {
            throw (err);
        }
    }

    static async leaveCampaign(id, campaignId) {
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

module.exports = AffiliateModule;