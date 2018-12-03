const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AffiliateSchema = new Schema({
    name: { type: String, unique: true, required: true },
    updated: { type: Number, default: Date.now, select: false }
});

const Affiliate = mongoose.model('affiliate', AffiliateSchema);

module.exports = Affiliate;