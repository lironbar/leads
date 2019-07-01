const User = require('../models/user');

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.username, password: req.body.password });

        if (!user) {
            console.log(`incorrect login for ${req.body.username} from ${req.origin}`);
            res.status(400);
            return res.end();
        }

        console.log(`user ${user.name} has logged in`);
        req.session.user = user;
        res.status(200);
        res.json(user);
    } catch (err) {
        console.error(`error while trying to login for ${req.body.username} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.logout = (req, res) => {
    console.log(`user ${req.session.user.name} has logged out`);
    req.session.destroy();
    res.status(200);
    res.end();
};

module.exports.verifyLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        console.error(`denied unauthorized request (${req.method}) ${req.url} from ${req.origin}`);
        res.status(401);
        res.end();
    }
};

module.exports.setRole = (req, res, next) => {
    req.session.isAdmin = (req.session.user.role === 'ADMIN');
    req.session.isPublisher = (req.session.user.role === 'PUBLISHER');
    req.session.isAffiliate = (req.session.user.role === 'AFFILIATE');
    next();
};