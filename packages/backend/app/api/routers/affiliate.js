const router = require('express').Router();
const { affiliate } = global.API.controllers;

router.get('/', affiliate.find);

router.get('/:id', affiliate.findOne);

router.get('/:id/campaigns', affiliate.getCampaigns);

module.exports = router;