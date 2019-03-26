const { Lead } = global.App.Components;

module.exports.findOne = async (req, res) => {
    try {
        const lead = await Lead.get(req.params);
        res.status(200);
        res.json(lead);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findByCampaign = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        if (params.affiliateIds) {
            params.affiliateIds = params.affiliateIds.split(',');
        }
        if (params.publisherIds) {
            params.publisherIds = params.publisherIds.split(',');
        }
        const leads = await Lead.findByParams(params);
        res.status(200);
        res.json(leads);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.sendForCampaign = async (req, res) => {
    try {
        const result = await Lead.findByParams(req.params.campaignId, req.body);
        res.status(200);
        res.json(result);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};