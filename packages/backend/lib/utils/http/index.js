const request = require('request');

module.exports = {
    request: (options) => {
        return new Promise((resolve, reject) => {
            request(options, (err, reponse) => {
                if (err) {
                    return reject(err);
                }
                resolve(reponse);
            });
        });
    }
};