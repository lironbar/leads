const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterfaceSchema = new Schema({
    type: { type: String, enum: ['http', 'email'], required: true },
    httpOptions: {
        url: {
            type: String,
            validate: (value) => {
                return new RegExp('[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)').test(value);
            },
            required: () => { return this.type === 'http' }
        },
        method: {
            type: String, enum: ['GET', 'POST', 'PUT'],
            required: () => { return this.type === 'http' }
        },
        successCodes: {
            type: [Number],
            default: [200],
            required: () => { return this.type === 'http' }
        }
    },
    updated: { type: Number, default: Date.now, select: false }
});

const Interface = mongoose.model('interface', InterfaceSchema);

module.exports = Interface;