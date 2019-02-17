const router = require('express').Router();
const { campaign, affiliate } = global.API.controllers;

router.post('/', campaign.create);

router.get('/', campaign.find);

router.get('/:id', campaign.findOne);

router.put('/:id', campaign.update);

router.delete('/:id', campaign.deleteOne);

router.get('/unassigned/:affiliateId', campaign.findUnassigned)

router.post('/:id/leads', campaign.sendLead);


router.post('/:id/join', affiliate.joinCampaign);

router.post('/:id/leave', affiliate.leaveCampaign);

module.exports = router;