const { env } = global.App.Config;
const { User } = global.App.Components;
const userCtrl = require('./user');

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.Model.findOne({ email: req.body.username || 'affiliate@gmail.com', password: req.body.password || 'demo' });
        if (user) {
            req.params.id = user._id;
            req.session.user = user;
            req.session.save((err) => {
                userCtrl.findOne(req, res, next);
            });
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
    req.session.destroy();
    res.status(200);
    res.end();
    next();
};

module.exports.verify = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
};