const Interface = require('../models/interface');

module.exports.create = async (req, res) => {
    try {
        const interface = new Interface(req.body);
        await interface.save();
        console.log(`created interface of type ${req.body.type} for campaign ${req.body.campaignId}`);
        res.status(200);
        res.json(interface);
    } catch (err) {
        console.error(`error creating interface for ${req.session.user.name} - ${err}`);
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
        const campaignId = req.query.campaignId;
        let result;
        if (campaignId) {
            result = await Interface.findOne({ campaignId });
        } else {
            result = await Interface.find();
        }

        if (!result) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(result);

    } catch (err) {
        console.error(`error finding interfaces - campaign ${campaignId} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const interface = await Interface.findOne({ _id: req.params.id });

        if (!interface) {
            res.status(404);
            return res.end();
        }

        res.status(200);
        res.json(interface);
    } catch (err) {
        console.error(`error finding interface ${req.params.id} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.update = async (req, res) => {
    try {
        const interface = await Interface.updateOne({ _id: req.params.id }, req.body, { new: true });
        console.log(`updated interface ${req.params.id}`);
        res.status(200);
        res.json(interface);
    } catch (err) {
        console.error(`error updaing interface ${req.params.id} - ${err}`);
        res.status(500);
        res.end();
    }
};

module.exports.deleteOne = async (req, res) => {
    try {
        await Interface.deleteOne({ _id: req.params.id });
        console.log(`deleted interface ${req.params.id}`);
        res.status(200);
        res.end();
    } catch (err) {
        console.error(`error deleting interface ${req.params.id} - ${err}`);
        res.status(500);
        res.end();
    }
};