const { Campaign, Lead } = global.App.Components;

module.exports.create = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(200);
        res.json(campaign);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const campaign = await Campaign.findOne(req.params.id);
        res.status(200);
        res.json(campaign);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.updateOne({ _id: req.params.id }, req.body);
        res.status(200);
        res.json(campaign);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.deleteOne = async (req, res) => {
    try {
        await Campaign.deleteOne({ _id: req.params.id });
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findUnassigned = async (req, res) => {
    try {
        const campaigns = await Campaign.findUnassigned(req.params.affiliateId);
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};