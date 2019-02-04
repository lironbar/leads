const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Campaign = require('../campaign/model.js');

const PublisherSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String },
    // private-held-company id
    phc: { type: String, required: true },
    updated: { type: Number, default: Date.now, select: false }
},
    {
        toJSON: {
            virtuals: true
        }
    });

// campaigns associated with the publisher
PublisherSchema.virtual('campaigns', {
    ref: 'campaign',
    localField: '_id',
    foreignField: 'publisherId',
    justOne: false
});

// TODO: Update and not delete
PublisherSchema.post('remove', { document: true }, (removedDoc) => {
    // remove campaigns associated with the publisher
    Campaign.deleteMany({ publisherId: removedDoc._id }, (deleteError) => {
        if (deleteError) {
            console.error('campaign.deleteMany', deleteError);
        }
    });
});


const Publisher = mongoose.model('publisher', PublisherSchema);

module.exports = Publisher;