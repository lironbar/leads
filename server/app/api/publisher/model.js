const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Campaign = require('../campaign/model.js');

const PublisherSchema = new Schema({
    name: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    email: {
        type: String,
        validate: (value) => {
            return new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/').test(value);
        }
    },
    address: { type: String },
    contact: { type: String },
    // private-held-company id
    phc: { type: String, required: true },
    // list of campaigns associated with the publisher
    campaigns: [{ type: Schema.Types.ObjectId, ref: 'campaign' }],
    updated: { type: Number, default: Date.now, select: false }
});

PublisherSchema.post('remove', { document: true }, (removedDoc) => {
    // remove campaigns associated with the publisher
    Campaign.deleteMany({ publisher: removedDoc._id }, (deleteError) => {
        if (deleteError) {
            console.error('campaign.deleteMany', deleteError);
        }
    });
});

const Publisher = mongoose.model('publisher', PublisherSchema);

module.exports = Publisher;