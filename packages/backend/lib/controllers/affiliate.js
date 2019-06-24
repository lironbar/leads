const User = require('../models/user');

module.exports.find = async (req, res) => {
    try {
        const affiliates = await User.find({ role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1 }).populate('campaigns');
        res.status(200);
        res.json(affiliates);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const affiliate = await User.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1 }).populate('campaigns');
        res.status(200);
        res.json(affiliate);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.joinCampaign = async (req, res) => {
    try {
        const id = req.body.affiliateId, campaignId = req.params.id;
        const results = await User.update({ _id: id, role: 'AFFILIATE', campaigns: { $nin: [campaignId] } }, { $push: { campaigns: campaignId } });
        if (!results.nModified) {
            throw 'Failed to join campaign';
        }
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.leaveCampaign = async (req, res) => {
    try {
        const id = req.body.affiliateId, campaignId = req.params.id;
        const results = await User.update({ _id: id, role: 'AFFILIATE' }, { $pull: { campaigns: campaignId } });
        if (!results.nModified) {
            throw 'Failed to leave campaign';
        }
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const id = req.params.id;
        const affiliate = await User.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 0, campaigns: 1 }).populate('campaigns');
        if (!affiliate) {
            return affiliate;
        }
        res.status(200);
        res.json(affiliate.campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};