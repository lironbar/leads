const Interface = require('../models/interface');
const MongooseEntity = require('./mongoose-entity');

class InterfaceModule extends MongooseEntity {
    constructor() { }

    static get Name() {
        return 'Interface';
    }

    static create(obj) {
        return new Interface(obj).save();
    }

    static find() {
        return Interface.find();
    }

    static findOne(id) {
        return Interface.findOne({ _id: id });
    }

    static updateOne(id, obj) {
        return Interface.updateOne({ _id: id }, obj, { new: true });
    }

    static deleteOne(id) {
        return Interface.deleteOne({ _id: id });
    }

    static getByCampaign(campaignId) {
        return Interface.findOne({ campaignId: campaignId });
    }
}

module.exports = InterfaceModule;