const { Interface } = global.App.Components;

module.exports.create = async (req, res) => {
    try {
        const interface = await Interface.create(req.body);
        res.status(200);
        res.json(interface);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.find = async (req, res) => {
    try {
        let result;
        const campaignId = req.query.campaignId;
        if (campaignId) {
            result = await Interface.getByCampaign(campaignId);
        } else {
            result = await Interface.find();
        }
        res.status(200);
        res.json(result);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const interface = await Interface.findOne(req.params.id);
        res.status(200);
        res.json(interface);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.update = async (req, res) => {
    try {
        const interface = await Interface.updateOne({ _id: req.params.id }, req.body);
        res.status(200);
        res.json(interface);
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.deleteOne = async (req, res) => {
    try {
        await Interface.deleteOne({ _id: req.params.id });
        res.status(200);
        res.end();
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};