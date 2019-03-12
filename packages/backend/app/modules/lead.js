const Interface = require('./interface');
const { http } = global.App.Utils;

class Lead {
    static async send(campaignId, leadRequest) {
        try {
            // const campaign = await Campaign.findOne({ _id: campaignId });
            // const affiliate = await Affiliate.findOne(leadRequest.affiliateId);

            // keep only known interface properties

            // save lead as sent=false
            // lead = new Lead(leadObj);

            // calculations

            // send the lead
            const iface = await Interface.getByCampaign(campaignId);
            switch (iface.type) {
                case 'http':
                    const lead = JSON.stringify(leadRequest.lead);
                    const options = {
                        method: iface.method,
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': lead.length
                        }
                    };
                    const response = await http.request(iface.url, options, lead);

                    console.log(response);

                    break;
            }

            // post lead send

        } catch (err) {
            debugger;
        }
    }
}

module.exports = Lead;