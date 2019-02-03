const { env } = global.App.Config;
const User = require('../user/model.js');
const userCtrl = require('../user/controller.js');

module.exports.login = (req, res, next) => {
    User.findOne({ email: req.body.username, password: req.body.password })
        .exec((findError, userDoc) => {
            if (findError) {
                console.warn('login.findUser', findError);
                switch (findError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            if (userDoc) {
                res.cookie('session', Date.now(), {
                    maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                });
                req.params.id = userDoc._id;
                userCtrl.findOne(req, res, next);
            } else {
                res.status(400);
                res.end();
            }
        });
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