const router = require('express').Router();
const { publisher } = global.API.controllers;

router.get('/', publisher.find);

router.get('/:id', publisher.findOne);

router.get('/:id/campaigns', publisher.getCampaigns);

module.exports = router;