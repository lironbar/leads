(async () => {

    const express = require('express');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const expressSession = require('express-session');
    const mongoConnection = require('./connections/mongodb');
    const routers = require('./routers');
    const { env, port, session, sessionStore, cors: corsOpt, mongo } = require('./config');

    // connect to mongodb
    await mongoConnection.connect(mongo.url, mongo.options);

    // create express application
    const api = express();

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
                const path = `${__dirname}/.sessions`;
                session.store = new FileStore({ path, logFn: _ => { } });
                console.info('using file session store at', path);
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

    // set request origin
    api.use('/', (req, res, next) => {
        req.origin = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        next();
    });

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
    if (env === 'dev') {
        const User = require('./models/user');
        const user = {
            name: 'super admin',
            password: '123',
            email: 'admin@test.com',
            phone: '010101010',
            role: 'ADMIN'
        };
        await User.findOneAndUpdate({ name: user.name }, user, { upsert: true }, (upsertError) => {
            if (upsertError) {
                return console.error('boot.createSuperAdmin', upsertError);
            }
            console.log('dev mode super admin:', user.email, user.password);
        });
    }

    // listen
    api.listen(port, (err) => {
        if (err) {
            throw err;
        }
        console.info('listening on port', port);
    });

})();