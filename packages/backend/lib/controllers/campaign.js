const Campaign = require('../models/campaign');

module.exports.create = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        res.status(200);
        res.json(campaign);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('affiliates');
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id }).populate('affiliates');
        res.status(200);
        res.json(campaign);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.updateOne({ _id: req.params.id }, req.body, { new: true });
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
        const id = req.params.affiliateId;
        const campaigns = await Campaign.find().populate('affiliates');
        const unassigned = campaigns.filter(campaign => {
            return !campaign.affiliates.find(a => a._id.toString() === id);
        });
        res.status(200);
        res.json(unassigned);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};