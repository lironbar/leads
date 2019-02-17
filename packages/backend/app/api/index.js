const { port, env } = global.App.Config;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = express();

// init API on global
global.API = {};

// load controllers
global.API.controllers = require('./controllers');

// load routers
global.API.routers = require('./routers');

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
    res.status(200);
    res.end();
});

// parsing middlewares
api.use(bodyParser.json());
api.use(cookieParser());

const { routers } = global.API;
// registration
api.use('/register', routers.register);

// auth
api.use('/', routers.auth);

// routing
api.use('/user', routers.user);
api.use('/affiliate', routers.affiliate);
api.use('/publisher', routers.publisher);
api.use('/campaign', routers.campaign);
api.use('/interface', routers.interface);

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