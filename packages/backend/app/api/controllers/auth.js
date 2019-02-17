const { env } = global.App.Config;
const User = require('../../models/user');
const userCtrl = require('./user');

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.username, password: req.body.password });
        if (user) {
            res.cookie('session', Date.now(), {
                maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                httpOnly: true, // The cookie only accessible by the web server
            });
            req.params.id = user._id;
            userCtrl.findOne(req, res, next);
        } else {
            res.status(400);
            res.end();
        }
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.logout = (req, res, next) => {
    res.clearCookie('session');
    res.status(200);
    res.end();
};

module.exports.check = (req, res, next) => {
    if (env === 'dev' || req.cookies.session) {
        return next();
    }
    res.status(401);
    res.end();
};