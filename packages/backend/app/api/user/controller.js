const User = require('./model.js');

module.exports.save = (req, res, next) => {
    req.body.roles = [req.body.type];
    new User(req.body).save((saveError, savedDoc) => {
        if (saveError) {
            console.warn('user.save', saveError);
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
    User.find().skip(skip).limit(limit)
        .exec((findError, foundDocs) => {
            if (findError) {
                console.warn('user.find', findError);
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
    User.findOne({ _id: req.params.id })
        .select('+isAdmin') // force selection of isAdmin field
        .populate('members.affiliates members.publishers')
        .exec((findOneError, foundDoc) => {
            if (findOneError) {
                console.warn('user.findOne', findOneError);
                switch (findOneError.code) {
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            let userObj;
            if (foundDoc) {
                // cast document to object
                userObj = foundDoc.toObject();
                // remove isAdmin field for non-admins
                if (!userObj.isAdmin) {
                    delete userObj.isAdmin;
                }
            }
            res.status(200);
            res.json(userObj);
            next();
        });
};

module.exports.update = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, req.body, (updateError) => {
        if (updateError) {
            console.warn('user.update', updateError);
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
    User.deleteOne({ _id: req.params.id }, (deleteOneError) => {
        if (deleteOneError) {
            console.warn('user.deleteOne', deleteOneError);
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