const { env } = global.App.Config;
const User = require('../user/model.js');

module.exports.login = (req, res, next) => {
    User
        .find({ email: req.body.username, password: req.body.password })
        .populate('members.affiliates')
        .populate('members.publishers')
        .limit(1)
        .exec((findError, foundDocs) => {
            if (findError) {
                req.status(500);
                return req.end();
            }
            const userDoc = foundDocs[0];
            if (userDoc) {
                res.cookie('session', Date.now(), {
                    maxAge: 1000 * 60 * 60, // would expire after 60 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                });
                res.status(200);
                res.json(userDoc);
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