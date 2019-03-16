const { Publisher } = global.App.Components;

module.exports.find = async (req, res, next) => {
    try {
        const publishers = await Publisher.find();
        res.status(200);
        res.json(publishers);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res, next) => {
    try {
        const publisher = await Publisher.findOne(req.params.id);
        res.status(200);
        res.json(publisher);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Publisher.getCampaigns(req.params.id);
        res.status(200);
        res.json(campaigns);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};