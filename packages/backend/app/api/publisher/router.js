const router = require('express').Router();
const controller = require('./controller.js');

router.post('/', controller.save);

router.get('/', controller.find);

router.get('/:id', controller.findOne);

router.get('/:id/campaigns', controller.findOneCampaigns);

router.put('/:id', controller.update);

router.delete('/:id', controller.deleteOne);

module.exports = router;