const { port, env } = global.App.Config;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = express();

// CORS
if (env === 'dev') {
    api.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

// allow OPTIONS requests
api.options('/*', (req, res, next) => {
    res.send(200);
});

// parsing middlewares
api.use(bodyParser.json());
api.use(cookieParser());

// registration
api.use('/register', require('./register/router.js'));

// auth
api.use('/', require('./auth/router.js'));

// routing
api.use('/user', require('./user/router.js'));
api.use('/publisher', require('./publisher/router.js'));
api.use('/campaign', require('./campaign/router.js'));
api.use('/affiliate', require('./affiliate/router.js'));
api.use('/interface', require('./interface/router.js'));

module.exports.boot = () => {
    return new Promise((resolve, reject) => {
        try {
            // listen
            api.listen(port, (err) => {
                if (err) {
                    throw err;
                }
                console.info('API listening on port', port);
                resolve();
            });
        } catch (apiListenErr) {
            console.error('failed to boot API server');
            reject(apiListenErr);
        }
    });
};