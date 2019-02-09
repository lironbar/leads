const router = require('express').Router();
const { auth } = global.API.controllers;

router.post('/login', auth.login);

router.post('/logout', auth.logout);

router.use('/', auth.check);

module.exports = router;