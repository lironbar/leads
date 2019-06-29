const User = require('../models/user');

module.exports.create = async (req, res) => {
    try {
        const user = await new User(req.body).save();
        console.log(`created user ${user.name}`);
        res.status(200);
        res.json(user);
    } catch (err) {
        console.error(`error creating user - ${err}`);
        if (err.name === 'ValidationError') {
            res.status(400);
            return res.send(err.message);
        }
        res.status(500);
        res.end();
    }
};

module.exports.find = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200);
        res.json(users);
    } catch (err) {
        console.error(`error finding users - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });

        if (!user) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(user);
    } catch (err) {
        console.error(`error finding user - ${err}`);
        res.status(500);
        res.end();
    }
};