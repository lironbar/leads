const UserModule = require('./user');

// bind to User model
const Affiliate = UserModule.Model;
class AffiliateModule extends UserModule {
    constructor() { }

    static get Name() {
        return 'Affiliate';
    }

    static find() {
        return Affiliate.find({ role: 'affiliate' }, { _id: 1, email: 1 }).populate('campaigns');
    }

    static findOne(id) {
        return Affiliate.findOne({ _id: id, role: 'affiliate' }, { _id: 1, email: 1 }).populate('campaigns');
    }

    static getCampaigns(id) {
        return new Promise((resolve, reject) => {
            Affiliate.findOne({ _id: id, role: 'affiliate' }, { _id: 0, campaigns: 1 })
                .populate('campaigns')
                .then(affiliate => {
                    if (!affiliate) {
                        resolve(affiliate);
                    }
                    return resolve(affiliate.campaigns || affiliate);
                })
                .catch(reject);
        });
    }

    static joinCampaign(id, campaignId) {
        return new Promise((resolve, reject) => {
            return Affiliate.update({ _id: id, role: 'affiliate', campaigns: { $nin: [campaignId] } }, { $push: { campaigns: campaignId } })
                .then(results => {
                    if (!results.nModified) {
                        throw 'Failed to join campaign';
                    }
                    resolve();
                })
                .catch(reject);
        });
    }

    static leaveCampaign(id, campaignId) {
        return new Promise((resolve, reject) => {
            Affiliate.update({ _id: id, role: 'affiliate' }, { $pull: { campaigns: campaignId } })
                .then((results) => {
                    if (!results.nModified) {
                        throw 'Failed to leave campaign';
                    }
                    resolve();
                })
                .catch(reject);
        });
    }
}

module.exports = AffiliateModule;