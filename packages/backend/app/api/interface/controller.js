const Interface = require('./model.js');

module.exports.save = (req, res, next) => {
    new Interface(req.body).save((saveError, savedDoc) => {
        if (saveError) {
            console.warn('interface.save', saveError);
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
    Interface.find().skip(skip).limit(limit)
        .exec((findError, foundDocs) => {
            if (findError) {
                console.warn('interface.find', findError);
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
    Interface.findOne({ _id: req.params.id }, (findOneError, foundDoc) => {
        if (findOneError) {
            console.warn('interface.findOne', findOneError);
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
    Interface.updateOne({ _id: req.params.id }, req.body, (updateError) => {
        if (updateError) {
            console.warn('interface.update', updateError);
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
    Interface.deleteOne({ _id: req.params.id }, (deleteOneError) => {
        if (deleteOneError) {
            console.warn('interface.deleteOne', deleteOneError);
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