const User = require('../models/user');

module.exports.create = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        res.status(200);
        res.json(user);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200);
        res.json(users);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        res.status(200);
        res.json(user);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};