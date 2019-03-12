const http = require('http');
const url = require('url');

const Interface = require('./interface');

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
            const _interface = await Interface.getByCampaign(campaignId);
            switch (_interface.type) {
                case 'http':
                    const data = JSON.stringify(leadRequest.lead);
                    const options = Object.assign({
                        method: _interface.type,
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': data.length
                        }
                    }, url.parse(_interface.url));

                    const req = http.request(options, (res) => {
                        console.log(`statusCode: ${res.statusCode}`)

                        res.on('data', (d) => {
                            process.stdout.write(d)
                        })
                    })

                    req.on('error', (error) => {
                        console.error(error)
                    })

                    req.write(data)
                    req.end()
                    break;
                case 'email':
            }

            // post lead send

        } catch (err) {
            debugger;
        }
    }
}

module.exports = Lead;