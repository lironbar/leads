const { Lead } = global.App.Components;
const { enums } = global.App.Utils;

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
        const userRole = req.session.user.role;
        switch (userRole) {
            case enums.userRoles.admin:
                if (params.affiliateIds) {
                    params.affiliateIds = params.affiliateIds.split(',');
                }
                if (params.publisherIds) {
                    params.publisherIds = params.publisherIds.split(',');
                }
                break;
            case enums.userRoles.affiliate:
                params.affiliateIds = [req.session.user._id];
                break;
            case enums.userRoles.publisher:
                params.publisherIds = [req.session.user._id];
                break;
        }
        const leads = await Lead.findByParams(params);
        res.status(200);
        res.json(leads);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

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