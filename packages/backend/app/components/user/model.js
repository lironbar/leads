const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: {
        type: String, unique: true, required: true,
        validate: value => new RegExp('.+\@.+\..+').test(value)
    },
    phone: { type: String, required: true },
    role: {
        type: { enum: ['ADMIN', 'PUBLISHER', 'AFFILIATE'] },
        default: 'AFFILIATE',
        required: true
    },
    campaigns: { type: [{ type: Schema.Types.ObjectId, ref: 'campaign' }] },
    phc: { type: String, required: () => this.role === 'PUBLISHER' }, // private-held-company id
    contact: { type: String, required: () => this.role === 'PUBLISHER' },
    updated: { type: Number, default: Date.now, select: false },
    active: { type: Boolean, default: true, select: false }
});

UserSchema.pre('save', function (next) {
    // capitalize role
    this.role = this.role.toUpperCase();
    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;