const { User } = global.App.Modules;

module.exports.create = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200);
        res.json(user);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200);
        res.json(users);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res, next) => {
    try {
        const user = await User.findOne(req.params.id);
        res.status(200);
        res.json(user);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};