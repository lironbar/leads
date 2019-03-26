const { port, session, sessionStore, cors: corsOpt } = global.App.Config;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const api = express();

// init API on global
global.API = {};

// load controllers
global.API.controllers = require('./controllers');

// load routers
global.API.routers = require('./routers');

// CORS
api.use(cors(corsOpt));

// allow OPTIONS requests
api.options('/*', (req, res, next) => {
    res.status(200);
    res.end();
});

// session
if (sessionStore) {
    switch (sessionStore.name) {
        case 'session-file-store':
            const FileStore = require('session-file-store')(expressSession);
            const options = { ...sessionStore.options, path: `${__dirname}/.sessions`, logFn: _ => { } }
            session.store = new FileStore(options);
            console.info(`using "${sessionStore.name}" session store`);
            break;
        default:
            console.warn('unknown session store', sessionStore);
            break;
    }
}
api.use(expressSession(session));

// parsers
api.use(bodyParser.json());
api.use(cookieParser());

const { routers } = global.API;

// registration
api.use('/register', routers.register());

// auth
api.use(routers.auth());

// routing
api.use('/user', routers.user());
api.use('/lead', routers.lead());
api.use('/campaign', routers.campaign());
api.use('/affiliate', routers.affiliate());
api.use('/publisher', routers.publisher());
api.use('/interface', routers.interface());

// create super admin user
if (global.App.Config.env === 'dev') {
    const { User } = global.App.Components;
    const user = {
        name: 'super admin',
        password: '123',
        email: 'admin@test.com',
        phone: '010101010',
        role: 'ADMIN'
    };
    User.Model.findOneAndUpdate({ name: user.name }, user, { upsert: true }, (upsertError) => {
        if (upsertError) {
            return console.error('boot.createSuperAdmin', upsertError);
        }
        console.log('dev mode super admin:', user.email, user.password);
    });
}

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