const Url = require('url');
const HTTP = { http: require('http'), https: require('https') };

module.exports = {
    request: (url, options, data) => {
        return new Promise((resolve, reject) => {
            options = Object.assign(Url.parse(url), options);
            const http = HTTP[options.protocol.replace(/[^a-zA-Z]/, '')];

            if (!http) {
                return reject('Unsupported protocol', parsedUrl.protocol);
            }

            const req = http.request(options, resolve);
            req.on('error', reject);
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }
};