const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        type: String, unique: true, required: true,
        validate: (value) => {
            return new RegExp('.+\@.+\..+').test(value);
        }
    },
    phone: { type: String, required: true },
    members: {
        publishers: { type: [{ type: Schema.Types.ObjectId, ref: 'publisher' }] },
        affiliates: { type: [{ type: Schema.Types.ObjectId, ref: 'affiliate' }] }
    },
    isAdmin: { type: Boolean, default: false, select: false },
    updated: { type: Number, default: Date.now, select: false }
});

// TODO: disable members on user deactivation

const User = mongoose.model('user', UserSchema);

module.exports = User;