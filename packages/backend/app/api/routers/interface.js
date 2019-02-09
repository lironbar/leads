const router = require('express').Router();
const { interface } = global.API.controllers;

router.post('/', interface.save);

router.get('/', interface.find);

router.get('/:id', interface.findOne);

router.put('/:id', interface.update);

router.delete('/:id', interface.deleteOne);

module.exports = router;