(async () => {

    global.App = {};

    // load config
    global.App.Config = require('./app/config/config.js');

    // boot application
    await require('./app/connections/connections.js').boot();
    await require('./app/api/api.js').boot();

    // handle dev environment
    if (global.App.Config.env === 'dev') {
        // create test admin user
        const User = require('./app/api/user/model.js');
        const user = {
            name: 'test admin',
            password: '123',
            email: 'admin@test.com',
            phone: '010101010',
            isAdmin: true,
        };
        User.findOneAndUpdate({ name: 'test admin' }, user, { upsert: true }, (upsertError) => {
            if (upsertError) {
                return console.error('boot.createDevAdmin', upsertError);
            }
            console.log('boot.createDevAdmin', 'login:', user.email, user.password);
        });
    }

})();
