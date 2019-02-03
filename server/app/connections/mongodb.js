const mongoose = require('mongoose');
const { mongo } = global.App.Config;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

module.exports.boot = () => {
    const connection = mongoose.connection;

    connection.on('connecting', () => {
        console.debug('MongoDB connecting');
    });
    connection.on('connected', () => {
        console.info('MongoDB connected');
    });
    connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });
    connection.on('error', (err) => {
        console.error('MongoDB connection error', err);
    });

    return mongoose.connect(mongo.url, mongo.options);
}