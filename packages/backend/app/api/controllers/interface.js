const { Interface } = global.App.Modules;

module.exports.create = (req, res, next) => {
    Interface.create(req.body)
        .then(interface => {
            res.status(200);
            res.json(interface);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.find = (req, res, next) => {
    Interface.find()
        .then(interfaces => {
            res.status(200);
            res.json(interfaces);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.findOne = (req, res, next) => {
    Interface.findOne(req.params.id)
        .then(interface => {
            res.status(200);
            res.json(interface);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.update = (req, res, next) => {
    Interface.updateOne({ _id: req.params.id }, req.body)
        .then(interface => {
            res.status(200);
            res.json(interface);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.deleteOne = (req, res, next) => {
    Interface.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200);
            res.end();
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};