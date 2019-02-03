const mongodb = require('./mongodb')

module.exports.boot = () => {
    return Promise.all(
        [mongodb]
            .map(connection => { return connection.boot(); })
    );
};