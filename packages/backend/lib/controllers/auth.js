const User = require('../models/user');

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.username, password: req.body.password });
        if (!user) {
            throw 'incorrect username or password';
        }
        req.session.user = user;
        res.status(200);
        res.json(user);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.status(200);
    res.end();
};

module.exports.isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
};