const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    name: { type: String, unique: true, required: true },
    active: { type: Boolean, default: true },
    subject: { type: String },
    description: { type: String },
    imageUrl: {
        type: String,
        validate: (value) => {
            return new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})', 'gi')
                .test(value);
        }
    },
    // price for each lead sent
    price: { type: Number, required: true },
    // total max leads allowed to be sent for the campaign
    maxLeads: { type: Number, required: true },
    // total max leads allowed to be sent for the campaign per day
    maxDailyLeads: { type: Number, required: true },
    // out of the max leads,
    // the minimum percentage of leads which would always be counted as valid
    hedgePercentage: { type: Number, default: 0 },
    // ?
    marketingText: { type: String },
    // email address to use for this campaign (e.g for email API)
    email: {
        type: String,
        validate: (value) => {
            return new RegExp('.+\@.+\..+').test(value);
        }
    },
    // a list of demands for the affiliates
    demands: { type: [String] },
    // a list of tips for the affiliates
    marketingStrategies: { type: [String] },
    // the publisher who owns this campaign
    publisherId: { type: Schema.Types.ObjectId, required: true },
    // api to use when sending leads for this campaign
    // interface: { type: Schema.Types.ObjectId, ref: 'interface' },
    updated: { type: Number, default: Date.now, select: false }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// affiliates assigned to the campaign
CampaignSchema.virtual('affiliates', {
    ref: 'user',
    localField: '_id',
    foreignField: 'campaigns',
    justOne: false,
});

const Campaign = mongoose.model('campaign', CampaignSchema);

module.exports = Campaign;