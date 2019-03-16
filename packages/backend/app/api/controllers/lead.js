const { Lead } = global.App.Components;

module.exports.find = async (req, res, next) => {
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
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};