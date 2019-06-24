const Url = require('url');

module.exports = {
    request: (url, options, data) => {
        return new Promise((resolve, reject) => {
            let { protocol } = Url.parse(url);
            let handler;

            if (protocol === 'http:') {
                handler = require('http');
            } else if (protocol === 'https:') {
                handler = require('https');
            } else {
                throw new Error(`Unsupported protocol ${protocol}`);
            }

            const req = handler.request(url, options, () => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });

            req.on('error', reject);

            req.write(data);
            req.end();
        });
    }
};