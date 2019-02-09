const { User } = global.App.Modules;

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            res.status(200);
            res.json(user);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.find = (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200);
            res.json(users);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.findOne = (req, res, next) => {
    User.findOne(req.params.id)
        .then(user => {
            res.status(200);
            res.json(user);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};