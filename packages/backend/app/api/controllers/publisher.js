const { Publisher } = global.App.Modules;

module.exports.find = (req, res, next) => {
    Publisher.find()
        .then(publishers => {
            res.status(200);
            res.json(publishers);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.findOne = (req, res, next) => {
    Publisher.findOne(req.params.id)
        .then(publisher => {
            res.status(200);
            res.json(publisher);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.getCampaigns = (req, res, next) => {
    Publisher.getCampaigns(req.params.id)
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