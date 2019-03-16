(async () => {

    // init App on global
    global.App = {};

    // load config
    global.App.Config = require('./app/config');

    // load utilities
    global.App.Utils = require('./app/utils');

    // load components
    global.App.Components = require('./app/components');

    // load services
    global.App.Services = require('./app/services');

    // boot application
    await require('./app/connections').boot();
    await require('./app/api').boot();

})();
