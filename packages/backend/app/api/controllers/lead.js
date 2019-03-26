const { Lead } = global.App.Components;

module.exports.send = async (req, res) => {
    try {
        const result = await Lead.send(req.params.campaignId, req.body);
        res.status(200);
        res.json(result);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        const params = { ...req.params, ...req.query };
        if (params.affiliateIds) {
            params.affiliateIds = params.affiliateIds.split(',');
        }
        if (params.publisherIds) {
            params.publisherIds = params.publisherIds.split(',');
        }
        const leads = await Lead.get(params);
        res.status(200);
        res.json(leads);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};