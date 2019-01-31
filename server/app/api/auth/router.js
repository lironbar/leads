const router = require('express').Router();
const controller = require('./controller.js');

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.use('/', controller.check);

module.exports = router;