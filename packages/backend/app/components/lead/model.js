const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    success: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    timestamp: { type: Number, required: () => this.success === true },
    payload: { type: Object, required: true },
    response: { type: Object },
    price: { type: Number, required: true },
    interfaceId: { type: Schema.Types.ObjectId, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    campaign: { type: Schema.Types.ObjectId, ref: 'campaign', required: true },
    affiliate: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    updated: { type: Number, default: Date.now, select: false }
});

const Lead = mongoose.model('lead', LeadSchema);

module.exports = Lead;