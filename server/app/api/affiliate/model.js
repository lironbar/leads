const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AffiliateSchema = new Schema({
    name: {type: String, unique: true, required: true},
    phone: {type: String, unique: true, required: true},
    email: {
        type: String, unique: true, required: true,
        validate: (value) => {
            return new RegExp('.+\@.+\..+').test(value);
        }
    },
    address: {type: String, required: true},
    updated: {type: Number, default: Date.now, select: false}
});

AffiliateSchema.virtual('campaigns', {
    ref: 'campaign',
    localField: '_id',
    foreignField: 'affiliates',
    justOne: false
});

const Affiliate = mongoose.model('affiliate', AffiliateSchema);

module.exports = Affiliate;