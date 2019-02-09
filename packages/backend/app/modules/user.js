const User = require('../models/user');
const MongooseEntity = require('./mongoose-entity')

class UserModule extends MongooseEntity {
    constructor() { }

    static get EntityName() {
        return 'User';
    }

    static get Model() {
        return User;
    }

    static create(obj) {
        return new User(obj).save();
    }

    static find() {
        return User.find();
    }

    static findOne() {
        return User.findOne();
    }

}

module.exports = UserModule;