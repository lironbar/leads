const UserModule = require('./user');
const CampaignModule = require('./campaign');

// bind to User model
const Publisher = UserModule.Model;
class PublisherModule extends UserModule {
    constructor() { }

    static get Name() {
        return 'Publisher';
    }

    static find() {
        return Publisher.find({ role: 'publisher' }, { _id: 1, email: 1 }).populate('campaigns');
    }

    static findOne(id) {
        return Publisher.findOne({ _id: id, role: 'publisher' }, { _id: 1, email: 1 }).populate('campaigns');
    }

    static getCampaigns(id) {
        return CampaignModule.getPublisherCampaigns(id);
    }
}

module.exports = PublisherModule;