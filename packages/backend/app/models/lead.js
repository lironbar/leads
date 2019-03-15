const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    sent: { type: Boolean, default: false },
    timestamp: { type: Number, required: () => this.sent === true },
    payload: { type: Object, required: true },
    response: { type: Object, required: () => this.sent === true },
    price: { type: Number, required: true },
    interfaceId: { type: Schema.Types.ObjectId, required: true },
    affiliateId: { type: Schema.Types.ObjectId, required: true },
    campaignId: { type: Schema.Types.ObjectId, required: true },
    updated: { type: Number, default: Date.now, select: false }
});

const Lead = mongoose.model('lead', LeadSchema);

module.exports = Lead;