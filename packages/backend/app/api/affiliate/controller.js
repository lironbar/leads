const Affiliate = require('./model.js');

module.exports.save = (req, res, next) => {
    new Affiliate(req.body).save((saveError, savedDoc) => {
        if (saveError) {
            console.warn('affiliate.save', saveError);
            switch (saveError.name) {
                case 'ValidationError':
                    res.status(400);
                    return res.send(saveError.message);
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        req.params.id = savedDoc._id;
        this.findOne(req, res, next);
    });
};

module.exports.find = (req, res, next) => {
    const skip = Number(req.query.skip || 0), limit = (Math.min(req.query.limit, 2000) + 1);
    Affiliate.find().skip(skip).limit(limit)
        .exec((findError, foundDocs) => {
            if (findError) {
                console.warn('affiliate.find', findError);
                switch (findError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            if (foundDocs.length === limit) {
                res.status(206);
                foundDocs.pop();
                res.json(foundDocs);
            } else {
                res.status(200);
                res.json(foundDocs);
            }
            next();
        });
};

module.exports.findOne = (req, res, next) => {
    Affiliate.findOne({ _id: req.params.id }, (findOneError, foundDoc) => {
        if (findOneError) {
            console.warn('affiliate.findOne', findOneError);
            switch (findOneError.code) {
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        res.status(200);
        res.json(foundDoc);
        next();
    });
};

module.exports.findOneCampaigns = (req, res, next) => {
    Affiliate.findOne({ _id: req.params.id })
        .populate('campaigns')
        .exec((findError, foundDoc) => {
            if (findError) {
                console.warn('affiliate.findPublisherCampaigns', findError);
                switch (findError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            res.status(200);
            res.json(foundDoc ? foundDoc.campaigns : []);
            next();
        });
};

module.exports.update = (req, res, next) => {
    Affiliate.updateOne({ _id: req.params.id }, req.body, (updateError) => {
        if (updateError) {
            console.warn('affiliate.update', updateError);
            switch (updateError.name) {
                case 'ValidationError':
                    res.status(400);
                    return res.send(updateError.message);
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        res.status(200);
        res.end();
        next();
    });
};

module.exports.deleteOne = (req, res, next) => {
    Affiliate.deleteOne({ _id: req.params.id }, (deleteOneError) => {
        if (deleteOneError) {
            console.warn('affiliate.deleteOne', deleteOneError);
            switch (deleteOneError.code) {
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        res.status(200);
        res.end();
        next();
    });
};