const { join } = require('path');
const User = require('../user/model.js');

module.exports.register = (req, res, next) => {
    const memberRolesSet = new Set(['PUBLISHER', 'AFFILIATE']);
    let memberRole = req.params.memberRole;
    if (!memberRolesSet.has(memberRole.toUpperCase())) {
        // defaults to AFFILIATE
        memberRole = 'AFFILIATE';
    }
    // create publisher/affiliate by memberRole
    const MemberModel = require(join('..', memberRole.toLowerCase(), 'model.js'));
    new MemberModel(req.body).save((saveMemberError, savedMemberDoc) => {
        if (saveMemberError) {
            console.warn('register.save.member', saveMemberError);
            switch (saveMemberError.name) {
                case 'ValidationError':
                    res.status(400);
                    return res.send(saveMemberError.message);
                default:
                    res.status(500);
                    return res.send('Something went wrong!');
            }
        }
        // create the user
        new User(req.body).save((userSaveError, savedUserDoc) => {
            if (userSaveError) {
                console.warn('register.save.user', userSaveError);
                switch (userSaveError.name) {
                    case 'ValidationError':
                        res.status(400);
                        return res.send(userSaveError.message);
                    default:
                        res.status(500);
                        return res.send('Something went wrong!');
                }
            }
            // update the user with the assigned member
            savedUserDoc.members[memberRole.toLowerCase() + 's'].push(savedMemberDoc._id);
            savedUserDoc.save((updateUserError, updatedUserDoc) => {
                if (updateUserError) {
                    console.warn('register.update.user', updateUserError);
                    switch (updateUserError.name) {
                        case 'ValidationError':
                            res.status(400);
                            return res.send(updateUserError.message);
                        default:
                            res.status(500);
                            return res.send('Something went wrong!');
                    }
                }
                res.status(200);
                res.json(updatedUserDoc);
            });
        });
    });
};