const User = require('../models/user');
const Campaign = require('../models/campaign');

module.exports.create = async (req, res) => {
    try {
        if (req.session.user.role !== 'ADMIN') {
            return res.end(403);
        }
        
        const id = await new User({ role: 'PUBLISHER', ...req.body }).save()._id;
        const publisher = User.findOne({ _id: id }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');
        res.status(200);
        res.json(publisher);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        const publishers = await User.find({ role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');
        res.status(200);
        res.json(publishers);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await User.findOne({ _id: id, role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');
        res.status(200);
        res.json(publisher);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await User.findOneAndUpdate({ _id: id, role: 'PUBLISHER' }, req.body, { new: true }).populate('campaigns');
        res.status(200);
        res.json(publisher);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const id = req.params.id;
        const campaigns = await Campaign.find({ _id: id }).populate('affiliates');
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        if (req.session.user.role !== 'ADMIN') {
            return res.end(403);
        }

        await User.deleteOne({ _id: id, role: 'PUBLISHER' });
        res.end(200);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};