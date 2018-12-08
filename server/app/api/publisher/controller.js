const Publisher = require('./model.js');

module.exports.save = (req, res, next) => {
    new Publisher(req.body).save((saveError, savedDoc) => {
        if (saveError) {
            console.warn('publisher.save', saveError);
            switch (saveError.code) {
                // schema validation
                case 11000:
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
    const skip = Number(req.query.skip), limit = (Math.min(req.query.limit, 2000) + 1);
    Publisher.find().skip(skip).limit(limit)
        .exec((findError, foundDocs) => {
            if (findError) {
                console.warn('publisher.find', findError);
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
    Publisher.findOne({ _id: req.params.id }, (findOneError, foundDoc) => {
        if (findOneError) {
            console.warn('publisher.findOne', findOneError);
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
    Publisher.findOne({ _id: req.params.id })
        .populate('campaigns')
        .exec((findError, foundDoc) => {
            if (findError) {
                console.warn('publisher.findPublisherCampaigns', findError);
                switch (findError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            res.status(200);
            res.json(foundDoc.campaigns);
            next();
        });
};

module.exports.update = (req, res, next) => {
    Publisher.updateOne({ _id: req.params.id }, req.body, (updateError) => {
        if (updateError) {
            console.warn('publisher.update', updateError);
            switch (updateError.code) {
                // schema validation
                case 11000:
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
    Publisher.findOne({ _id: req.params.id }, (findOneError, foundDoc) => {
        if (findOneError) {
            console.warn('publisher.findOne', findOneError);
            switch (findOneError.code) {
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        if (!foundDoc) {
            res.status(200);
            res.end();
            return next();
        }
        foundDoc.remove((removeError, removedDoc) => {
            if (removeError) {
                console.warn('publisher.remove', removeError);
                switch (removeError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            res.status(200);
            res.send();
            next();
        });
    });
};