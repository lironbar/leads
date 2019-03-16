const User = require('./model');
const MongooseEntity = require('../mongoose-entity/mongoose-entity');

class UserModule extends MongooseEntity {

    constructor() { super(User); }

    static get Name() {
        return 'User';
    }

    create(obj) {
        return new User(obj).save();
    }

    find() {
        return User.find();
    }

    findOne(id) {
        return User.findOne({ _id: id });
    }
}

const instace = new UserModule();
module.exports = instace;