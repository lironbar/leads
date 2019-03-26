const User = require('./model');
const MongooseEntity = require('../mongoose-entity/mongoose-entity');

class UserModule extends MongooseEntity {

    constructor() { super(User); }

    static get Name() {
        return 'User';
    }

}

const instace = new UserModule();
module.exports = instace;