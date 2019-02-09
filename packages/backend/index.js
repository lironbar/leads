(async () => {

    // init App on global
    global.App = {};

    // load config
    global.App.Config = require('./app/config');

    // load modules
    global.App.Modules = require('./app/modules');

    // boot application
    await require('./app/connections').boot();
    await require('./app/api').boot();

    // create super admin user
    //const User = require('./app/api/user/model.js');
    // const user = {
    //     name: 'super admin',
    //     password: '123',
    //     email: 'admin@admin.com',
    //     phone: '010101010',
    //     isAdmin: true,
    // };
    // User.findOneAndUpdate({ name: user.name }, user, { upsert: true }, (upsertError) => {
    //     if (upsertError) {
    //         return console.error('boot.createSuperAdmin', upsertError);
    //     }
    //     console.log('boot.createSuperAdmin', 'login:', user.email, user.password);
    // });

})();
