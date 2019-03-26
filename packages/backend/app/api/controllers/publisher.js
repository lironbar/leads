const { Publisher } = global.App.Components;

module.exports.find = async (req, res) => {
    try {
        const publishers = await Publisher.find();
        res.status(200);
        res.json(publishers);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.findOne = async (req, res) => {
    try {
        const publisher = await Publisher.findOne(req.params.id);
        res.status(200);
        res.json(publisher);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};

module.exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Publisher.getCampaigns(req.params.id);
        res.status(200);
        res.json(campaigns);
        
    } catch (err) {
        res.status(500);
        res.send(err);
    }
};