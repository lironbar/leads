const User = require('../models/user');

module.exports.register = async (req, res) => {
    try {
        console.log(`creating ${req.params.role} user ${req.body.username}`);
        req.body.role = req.params.role;
        const user = await new User(req.body).save();
        req.session.user = user;
        res.status(200);
        res.json(user);
    } catch (err) {
        console.error(`error creating user - ${err}`);
        if (err.name === 'ValidationError') {
            res.status(400);
            return res.send(err.message);
        }
        res.status(500);
        res.send(`internal error`);
    }
};