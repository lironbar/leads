const User = require('../models/user');
const Campaign = require('../models/campaign');

module.exports.create = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            console.warn(`denied publisher creation by non-admin user ${req.session.user.name}`);
            res.status(403);
            return res.end();
        }

        let publisher = new User({ role: 'PUBLISHER', ...req.body });
        await publisher.save();
        console.log(`created new publisher ${publisher._id}  ${publisher.name}`);

        publisher = await User.findOne({ _id: publisher._id }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');
        res.status(200);
        res.json(publisher);
    } catch (err) {
        console.error(`error creating publisher for ${req.session.user.name} - ${err}`);
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
        const publishers = await User.find({ role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');
        res.status(200);
        res.json(publishers);
    } catch (err) {
        console.error(`error finding publishers - ${err}`);
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await User.findOne({ _id: id, role: 'PUBLISHER' }, { _id: 1, name: 1, email: 1, phone: 1, address: 1, phc: 1, contact: 1 }).populate('campaigns');

        if (!publisher) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(publisher);
    } catch (err) {
        console.error(`error finding publisher ${id} - ${err}`);
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const publisher = await User.findOneAndUpdate({ _id: id, role: 'PUBLISHER' }, req.body, { new: true }).populate('campaigns');
        console.log(`updated publisher ${publisher.name} by user ${req.session.user.name}`);
        res.status(200);
        res.json(publisher);
    } catch (err) {
        console.error(`error updating publisher - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const id = req.params.id;
        const campaigns = await Campaign.find({ publisherId: id }).populate('affiliates');
        res.status(200);
        res.json(campaigns);
    } catch (err) {
        console.error(`error finding publisher ${id} campaigns - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!res.session.isAdmin) {
            res.status(403);
            return res.end();
        }
        await User.deleteOne({ _id: id, role: 'PUBLISHER' });
        console.log(`deleted publisher ${id} by user ${req.session.user.name}`);
        res.status(200);
        res.end();
    } catch (err) {
        console.error(`error deleting publisher - ${err}`);
        res.status(500);
        res.end();
    }
};