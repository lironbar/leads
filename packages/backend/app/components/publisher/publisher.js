const User = require('../user/user');
const Campaign = require('../campaign/campaign');

// bind to User model
const Publisher = User.Model;
class PublisherModule extends User.constructor {

    constructor() { super(Publisher); }

    static get Name() {
        return 'Publisher';
    }

    find() {
        return Publisher.find({ role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, phc: 1, contact: 1 }).populate('campaigns');
    }

    findOne(id) {
        return Publisher.findOne({ _id: id, role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, phc: 1, contact: 1 }).populate('campaigns');
    }

    getCampaigns(id) {
        return Campaign.getPublisherCampaigns(id);
    }
}

const instace = new PublisherModule();
module.exports = instace;