const Campaign = require('../models/campaign');

module.exports.create = async (req, res) => {
    try {
        const campaign = new Campaign(req.body);
        await campaign.save();
        console.log(`created campaign ${campaign.name}`);

        res.status(200);
        res.json(campaign);
    } catch (err) {
        console.error(`error creating campaign - ${err}`);
        if (err.name === 'ValidationError') {
            res.status(400);
            return res.send(err.message);
        }
        res.status(500);
        res.send();
    }
};

module.exports.find = async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('affiliates');
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        console.error(`error finding campaigns - ${err}`);
        res.status(500);
        res.send();
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({ _id: req.params.id }).populate('affiliates');

        if (!campaign) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(campaign);
    } catch (err) {
        console.error(`error finding campaigns - ${err}`);
        res.status(500);
        res.send();
    }
};

module.exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        console.log(`updated campaign ${campaign.name} by user ${req.session.user.name}`);
        res.status(200);
        res.json(campaign);
    } catch (err) {
        console.error(`error updaing campaign ${req.params.id} - ${err}`);
        res.status(500);
        res.send();
    }
};

module.exports.deleteOne = async (req, res) => {
    try {
        await Campaign.findOneAndDelete({ _id: req.params.id });
        console.log(`deleted campaign ${req.params.id} by user ${req.session.user.name}`);

        res.status(200);
        res.end();
    } catch (err) {
        console.error(`error deleting campaign ${req.params.id} - ${err}`);
        res.status(500);
        res.send();
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
        console.error(`error finding unassigned campaigns for ${req.session.user.name} - ${err}`);
        res.status(500);
        res.send();
    }
};