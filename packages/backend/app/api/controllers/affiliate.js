const { Affiliate } = global.App.Components;

module.exports.find = async (req, res) => {
    try {
        const affiliates = await Affiliate.find();
        res.status(200);
        res.json(affiliates);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const affiliate = await Affiliate.findOne(req.params.id);
        res.status(200);
        res.json(affiliate);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.joinCampaign = async (req, res) => {
    try {
        await Affiliate.joinCampaign(req.body.affiliateId, req.params.id);
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.leaveCampaign = async (req, res) => {
    try {
        await Affiliate.leaveCampaign(req.body.affiliateId, req.params.id);
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Affiliate.getCampaigns(req.params.id);
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};