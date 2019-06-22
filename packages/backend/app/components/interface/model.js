const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterfaceSchema = new Schema({
    type: { type: String, enum: ['http', 'email'], required: true },
    email: {
        type: String,
        validate: value => new RegExp('.+\@.+\..+').test(value),
        required: () => this.type === 'email'
    },
    url: {
        type: String,
        validate: value => new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})', 'gi').test(value),
        required: () => this.type === 'http'
    },
    method: {
        type: String, enum: ['GET', 'POST', 'PUT'],
        required: () => this.type === 'http'
    },
    fields: [{
        name: { required: true, type: String },
        isStatic: { required: true, type: Boolean, default: false },
        required: { required: true, type: Boolean, default: false },
        type: { required: true, type: String, enum: ['string', 'number', 'select'] },
        value: { required: false, type: String }
    }],
    campaignId: { type: Schema.Types.ObjectId, required: true },
    updated: { type: Number, default: Date.now, select: false }
});

const Interface = mongoose.model('interface', InterfaceSchema);

module.exports = Interface;