const Campaign = require('./model.js');

module.exports.save = (req, res, next) => {
    new Campaign(req.body).save((saveError, savedDoc) => {
        if (saveError) {
            console.warn('campaign.save', saveError);
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

module.exports.join = (req, res, next) => {
    const affiliateId = req.query.affiliateId;
    if (affiliateId) {
        Campaign
            .updateOne({ _id: req.params.id, affiliates: { $nin: [affiliateId] } }, { $push: { affiliates: affiliateId } })
            .exec((updateError, updateResults) => {
                if (updateError) {
                    console.warn('campaign.join.update', updateError);
                    switch (updateError.name) {
                        case 'ValidationError':
                            res.status(400);
                            return res.send(updateError.message);
                        default:
                            res.status(500);
                            return res.send('Something went wrong!');
                    }
                }
                const updated = Boolean(updateResults.n);
                if (updated) {
                    this.findOne(req, res, next);
                } else {
                    res.status(400);
                    res.end();
                }
            });
    } else {
        res.status(400);
        res.end();
    }
};

module.exports.find = (req, res, next) => {
    const skip = Number(req.query.skip || 0), limit = (Math.min(req.query.limit, 2000) + 1);
    Campaign.find().skip(skip).limit(limit)
        .exec((findError, foundDocs) => {
            if (findError) {
                console.warn('campaign.find', findError);
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
    Campaign.findOne({ _id: req.params.id })
        .exec((findOneError, foundDoc) => {
            if (findOneError) {
                console.warn('campaign.findOne', findOneError);
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

module.exports.update = (req, res, next) => {
    Campaign.updateOne({ _id: req.params.id }, req.body, (updateError) => {
        if (updateError) {
            console.warn('campaign.update', updateError);
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
    Campaign.deleteOne({ _id: req.params.id }, (deleteOneError) => {
        if (deleteOneError) {
            console.warn('campaign.deleteOne', deleteOneError);
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