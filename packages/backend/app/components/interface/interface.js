const Interface = require('./model');
const MongooseEntity = require('../mongoose-entity/mongoose-entity');

class InterfaceModule extends MongooseEntity {

    constructor() { super(Interface); }

    static get Name() {
        return 'Interface';
    }

    create(obj) {
        return new Interface(obj).save();
    }

    find() {
        return Interface.find();
    }

    findOne(id) {
        return Interface.findOne({ _id: id });
    }

    updateOne(id, obj) {
        return Interface.findOneAndUpdate({ _id: id }, obj, { new: true });
    }

    deleteOne(id) {
        return Interface.deleteOne({ _id: id });
    }

    getByCampaign(campaignId) {
        return Interface.findOne({ campaignId });
    }
}

const instance = new InterfaceModule();
module.exports = instance;