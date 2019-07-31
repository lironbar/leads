const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    meta: {
        name: { required: true, type: String },
        phoneNumber: { required: true, type: String },
        info: { type: String }
    },
    success: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    timestamp: { type: Number, required: () => this.success === true },
    raw: { type: Object, required: true },
    payload: { type: Object, required: true },
    response: { type: Object },
    price: { type: Number, required: true },
    interfaceId: { type: Schema.Types.ObjectId, required: true },
    publisher: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    campaign: { type: Schema.Types.ObjectId, ref: 'campaign', required: true },
    affiliate: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    approvalReported: { type: Boolean, default: false },
    updated: { type: Number, default: Date.now, select: false }
});

const Lead = mongoose.model('lead', LeadSchema);

module.exports = Lead;