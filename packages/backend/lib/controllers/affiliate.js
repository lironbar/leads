const User = require('../models/user');

module.exports.create = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            console.warn(`denied affiliate creation by non-admin user ${req.session.user.name}`);
            res.status(403);
            return res.end();
        }

        let affiliate = new User({ role: 'AFFILIATE', ...req.body });
        await affiliate.save();
        console.log(`created new affiliate ${affiliate._id}  ${affiliate.name}`);

        affiliate = await User.findOne({ _id: affiliate._id }, { _id: 1, name: 1, email: 1, phone: 1, address: 1 }).populate('campaigns');
        res.status(200);
        res.json(affiliate);
    } catch (err) {
        console.error(`error creating affiliate - ${err}`);
        if (err.name === 'ValidationError') {
            res.status(400);
            return res.send(err.message);
        }
        res.status(500);
        res.end();
    }
};

module.exports.find = async (req, res) => {
    try {
        const affiliates = await User.find({ role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1 }).populate('campaigns');
        res.status(200);
        res.json(affiliates);
    } catch (err) {
        console.error(`error finding affiliates - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const affiliate = await User.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1 }).populate('campaigns');

        if (!affiliate) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(affiliate);
    } catch (err) {
        console.error(`error finding affiliate ${id} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const affiliate = await User.findOneAndUpdate({ _id: id, role: 'AFFILIATE' }, req.body, { new: true }).populate('campaigns');
        console.log(`updated affiliate ${affiliate.name} by user ${req.session.user.name}`);
        res.status(200);
        res.json(affiliate);
    } catch (err) {
        console.error(`error updating affiliate - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.joinCampaign = async (req, res) => {
    try {
        const id = req.body.affiliateId;
        const campaignId = req.params.id;
        const results = await User.updateOne({ _id: id, role: 'AFFILIATE', campaigns: { $nin: [campaignId] } }, { $push: { campaigns: campaignId } });

        if (!results.nModified) {
            console.log(`no campaign matched for affiliate ${req.session.user.name} requesting to join campaign ${campaignId}`);
            res.status(500);
            return res.send(`no campaign matched request`);
        }

        console.log(`affiliate ${id} joined campaign ${campaignId}`);

        res.status(200);
        res.end();
    } catch (err) {
        console.error(`error joining affiliate ${id} to campaign ${campaignId} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.leaveCampaign = async (req, res) => {
    try {
        const id = req.body.affiliateId, campaignId = req.params.id;
        const results = await User.updateOne({ _id: id, role: 'AFFILIATE' }, { $pull: { campaigns: campaignId } });

        if (!results.nModified) {
            console.log(`no campaign matched for affiliate ${req.session.user.name} requesting to leave campaign ${campaignId}`);
            res.status(500);
            return res.send(`no campaign matched request`);
        }

        console.log(`affiliate ${id} left campaign ${campaignId}`);

        res.status(200);
        res.end();
    } catch (err) {
        console.error(`error removing affiliate ${id} from campaign ${campaignId} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const id = req.params.id;
        const affiliate = await User.findOne({ _id: id, role: 'AFFILIATE' }, { _id: 0, campaigns: 1 }).populate('campaigns');

        if (!affiliate) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(affiliate.campaigns);
    } catch (err) {
        console.error(`error finding campaigns for affiliate ${id} - ${err}`);
        res.status(500);
        res.end();
    }
};