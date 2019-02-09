const User = require('./user');

class Authentication {
    constructor() { }

    static get Name() {
        return 'Register';
    }

    static async register(obj) {
        return User.create(obj);
    }

}

module.exports = Authentication;