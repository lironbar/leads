const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

async function connect(url, options) {
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

    try {
        await mongoose.connect(url, options);
    } catch (err) {
        console.error(`mongodb failed to connect to ${url}`);
        throw err;
    }
    return connection;
}

module.exports.connect = connect;