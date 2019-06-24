const Url = require('url');
const handlers = { http: require('http'), https: require('https') };

module.exports = {
    request: (url, options, data) => {
        return new Promise((resolve, reject) => {
            let { protocol } = Url.parse(url);
            protocol = (protocol ? protocol.replace(/[^a-zA-Z]/, '') : 'http');
            const handler = handlers[protocol];
            if (!handler) {
                throw 'Unsupported protocol';
            }
            const req = handler.request(url, options, resolve);
            req.on('error', reject);
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }
};