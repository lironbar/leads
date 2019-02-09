const router = require('express').Router();
const { register } = global.API.controllers;

router.post('/?:role', register.register);

module.exports = router;