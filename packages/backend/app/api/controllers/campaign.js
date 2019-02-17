const { Campaign } = global.App.Modules;

module.exports.create = async (req, res, next) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(200);
        res.json(campaign);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200);
        res.json(campaigns);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res, next) => {
    try {
        const campaign = await Campaign.findOne(req.params.id);
        res.status(200);
        res.json(campaign);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res, next) => {
    try {
        const campaign = await Campaign.updateOne({ _id: req.params.id }, req.body);
        res.status(200);
        res.json(campaign);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.deleteOne = async (req, res, next) => {
    try {
        await Campaign.deleteOne({ _id: req.params.id });
        res.status(200);
        res.end();
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findUnassigned = async (req, res, next) => {
    try {
        const campaigns = await Campaign.findUnassigned(req.params.affiliateId);
        res.status(200);
        res.json(campaigns);
        next();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

