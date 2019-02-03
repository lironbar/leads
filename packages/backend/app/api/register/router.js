const router = require('express').Router();
const controller = require('./controller.js');

router.post('/?:memberRole', controller.register);

module.exports = router;