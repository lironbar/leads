const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {
        type: String, unique: true, required: true,
        validate: (value) => {
            return new RegExp('.+\@.+\..+').test(value);
        }
    },
    updated: {type: Number, default: Date.now, select: false}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;