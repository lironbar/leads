module.exports = {
    http: require('./http'),
    email: require('./email'),
    date: require('./date'),
    enums: {
        userRoles: {
            admin: 'ADMIN',
            publisher: 'PUBLISHER',
            affiliate: 'AFFILIATE'
        }
    }
};