const { Affiliate } = global.App.Modules;

module.exports.find = (req, res, next) => {
    Affiliate.find()
        .then(affiliates => {
            res.status(200);
            res.json(affiliates);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.findOne = (req, res, next) => {
    Affiliate.findOne(req.params.id)
        .then(affiliate => {
            res.status(200);
            res.json(affiliate);
            next();
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        });
};

module.exports.joinCampaign = (req, res, next) => {
    Affiliate.joinCampaign(req.body.affiliateId, req.params.id)
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

module.exports.leaveCampaign = (req, res, next) => {
    Affiliate.leaveCampaign(req.body.affiliateId, req.params.id)
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

module.exports.getCampaigns = (req, res, next) => {
    Affiliate.getCampaigns(req.params.id)
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