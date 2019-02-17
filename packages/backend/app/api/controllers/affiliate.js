const { Affiliate } = global.App.Modules;

module.exports.find = async (req, res, next) => {
    try {
        const affiliates = await Affiliate.find();
        res.status(200);
        res.json(affiliates);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res, next) => {
    try {
        const affiliate = await Affiliate.findOne(req.params.id);
        res.status(200);
        res.json(affiliate);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.joinCampaign = async (req, res, next) => {
    try {
        await Affiliate.joinCampaign(req.body.affiliateId, req.params.id)
        res.status(200);
        res.end();
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.leaveCampaign = async (req, res, next) => {
    try {
        await Affiliate.leaveCampaign(req.body.affiliateId, req.params.id);
        res.status(200);
        res.end();
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Affiliate.getCampaigns(req.params.id);
        res.status(200);
        res.json(campaigns);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};