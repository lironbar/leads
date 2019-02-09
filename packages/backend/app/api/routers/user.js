const router = require('express').Router();
const { user } = global.API.controllers;

router.post('/', user.create);

router.get('/', user.find);

router.get('/:id', user.findOne);

module.exports = router;