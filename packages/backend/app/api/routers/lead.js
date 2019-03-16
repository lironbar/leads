const router = require('express').Router();
const { lead } = global.API.controllers;

router.get('/', lead.find);

router.get('/:campaignId', lead.find);

module.exports = router;