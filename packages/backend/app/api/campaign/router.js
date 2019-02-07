const router = require('express').Router();
const controller = require('./controller.js');

router.post('/', controller.save);

router.post('/:id/join', controller.join);

router.post('/:id/leave', controller.leave);

router.get('/', controller.find);

router.get('/:id', controller.findOne);

router.get('/unassigned/:affiliateId', controller.findUnassigned)

router.put('/:id', controller.update);

router.delete('/:id', controller.deleteOne);

module.exports = router;