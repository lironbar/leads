const Url = require('url');

module.exports = {
    request: (url, options, data) => {
        return new Promise((resolve, reject) => {
            let { protocol } = Url.parse(url);
            let handler;
            if (protocol === 'http') {
                handler = require('http');
            } else if (protocol === 'https') {
                handler = require('https');
            } else {
                throw new Error(`Unsupported protocol ${protocol}`);
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