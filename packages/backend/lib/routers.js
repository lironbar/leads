const express = require('express');
const auth = require('./controllers/auth'),
    user = require('./controllers/user'),
    campaign = require('./controllers/campaign'),
    register = require('./controllers/register'),
    interface = require('./controllers/interface'),
    affiliate = require('./controllers/affiliate'),
    publisher = require('./controllers/publisher'),
    lead = require('./controllers/lead');

module.exports = {
    auth: () => {
        const router = express.Router();
        router.post('/login', auth.login);
        router.post('/logout', auth.logout);
        router.use('/', auth.isLoggedIn);
        return router;
    },
    user: () => {
        const router = express.Router();
        router.post('/', user.create);
        router.get('/', user.find);
        router.get('/:id', user.findOne);
        return router;
    },
    lead: () => {
        const router = express.Router();
        router.get('/:leadId', lead.findOne);
        router.get('/campaign/:campaignId', lead.findByCampaign);
        router.post('/campaign/:campaignId', lead.send);
        return router;
    },
    campaign: () => {
        const router = express.Router();
        router.post('/', campaign.create);
        router.get('/', campaign.find);
        router.get('/:id', campaign.findOne);
        router.put('/:id', campaign.update);
        router.delete('/:id', campaign.deleteOne);
        router.get('/unassigned/:affiliateId', campaign.findUnassigned);
        router.post('/:id/join', affiliate.joinCampaign);
        router.post('/:id/leave', affiliate.leaveCampaign);
        return router;
    },
    register: () => {
        const router = express.Router();
        router.post('/?:role', register.register);
        return router;
    },
    interface: () => {
        const router = express.Router();
        router.post('/', interface.create);
        router.get('/', interface.find);
        router.get('/:id', interface.findOne);
        router.put('/:id', interface.update);
        router.delete('/:id', interface.deleteOne);
        return router;
    },
    affiliate: () => {
        const router = express.Router();
        router.get('/', affiliate.find);
        router.get('/:id', affiliate.findOne);
        router.get('/:id/campaigns', affiliate.getCampaigns);
        return router;
    },
    publisher: () => {
        const router = express.Router();
        router.get('/', publisher.find);
        router.get('/:id', publisher.findOne);
        router.put('/:id', publisher.update);
        router.get('/:id/campaigns', publisher.getCampaigns);
        return router;
    }
};