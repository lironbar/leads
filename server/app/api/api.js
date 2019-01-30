const { port, env } = global.App.Config;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = express();
const UserModel = require('./user/model.js');
const UserCtrl = require('./user/controller');

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
api.post('/register', UserCtrl.save);

// login
api.post('/login', (req, res, next) => {
    UserModel
        .find({ email: req.body.username, password: req.body.password })
        .limit(1)
        .exec((findError, foundDoc) => {
            if (findError) {
                req.status(500);
                return req.end();
            }
            const userDoc = foundDoc[0];
            if (userDoc) {
                res.cookie('session', Date.now(), {
                    maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                });
                res.status(200);
                res.json(userDoc);
            } else {
                res.status(400);
                res.end();
            }
        });
});

api.post('/logout', (req, res, next) => {
    res.clearCookie('session');
    res.status(200);
    res.end();
});

// auth
api.use((req, res, next) => {
    if (req.cookies.session) {
        return next();
    }
    res.status(401);
    res.end();
});

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