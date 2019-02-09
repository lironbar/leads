const { Campaign } = global.App.Modules;

module.exports.create = (req, res, next) => {
    Campaign.create(req.body)
        .then(campaign => {
            res.status(200);
            res.json(campaign);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.find = (req, res, next) => {
    Campaign.find()
        .then(campaigns => {
            res.status(200);
            res.json(campaigns);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.findOne = (req, res, next) => {
    Campaign.findOne(req.params.id)
        .then(campaign => {
            res.status(200);
            res.json(campaign);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.update = (req, res, next) => {
    Campaign.updateOne({ _id: req.params.id }, req.body)
        .then(campaign => {
            res.status(200);
            res.json(campaign);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.deleteOne = (req, res, next) => {
    Campaign.deleteOne({ _id: req.params.id })
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

module.exports.findUnassigned = (req, res, next) => {
    Campaign.findUnassigned(req.params.affiliateId)
        .then(campaigns => {
            res.status(200);
            res.json(campaigns);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

