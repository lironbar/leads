const url = require('url');

const Campaign = require('../models/campaign');
const MongooseEntity = require('./mongoose-entity');

const Interface = require('./interface');
const Affiliate = require('./affiliate');

// move to global
// global.App.ToolBox = {
//     sendHttpRequest: (options, data) => {
//         return new Promise((resolve, reject) => {
//             try {
//                 options.headers = {
//                     'Content-Type': 'application/json', //x-www-form-urlencoded
//                     // 'Content-Length': Buffer.byteLength(data)
//                 };

//                 let response = "";
//                 const http = require('http');
//                 const req = http.request(options, (res) => {
//                     console.log(`STATUS: ${res.statusCode}`);
//                     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//                     res.setEncoding('utf8');
//                     res.on('data', (chunk) => {
//                         response += chunk;
//                     });
//                     res.on('end', () => {
//                         resolve(response);
//                     });
//                 });

//                 req.on('error', (e) => {
//                     reject(e.message);
//                 });
//                 // write data to request body
//                 req.write(JSON.stringify(data));
//                 req.end();
//             } catch (err) {
//                 debugger
//             }
//         });
//     },
//     sendEmail: async () => { }
// };
// const Toolbox = global.App.ToolBox;

class CampaignModule extends MongooseEntity {
    constructor() { }

    static get Name() {
        return 'Campaign';
    }

    static create(obj) {
        return new Campaign(obj).save();
    }

    static find() {
        return Campaign.find().populate('affiliates');
    }

    static findOne(id) {
        return Campaign.findOne({ _id: id }).populate('affiliates');
    }

    static updateOne(id, obj) {
        return Campaign.updateOne({ _id: id }, obj, { new: true });
    }

    static deleteOne(id) {
        return Campaign.deleteOne({ _id: id });
    }

    static getPublisherCampaigns(publisherId) {
        return Campaign.find({ publisherId }).populate('affiliates');
    }

    static async findUnassigned(affiliateId) {
        try{
            const campaigns = await Campaign.find().populate('affiliates');
            return campaigns.filter(campaign=>{
                const affiliates = campaign.affiliates.map(a=>a._id.toString());
                return affiliates.indexOf(affiliateId) === -1;
            });
        }catch(err) {
            throw err;
        }
    }

    static async sendLead(campaignId, leadRequest) {
        return { sent: false, message: 'not implemented' };
    }

    // static async sendLead(campaignId, leadRequest) {
    //     try {
    //         const campaign = await Campaign.findOne({ _id: campaignId });
    //         const _interface = await Interface.getByCampaign(campaignId);
    //         const affiliate = await Affiliate.findOne(leadRequest.affiliateId);

    //         // keep only known interface properties

    //         // save lead as sent=false
    //         // lead = new Lead(leadObj);

    //         // calculations

    //         // send the lead
    //         switch (_interface.type) {
    //             case 'http':
    //                 const parsedUrl = url.parse(_interface.url);
    //                 const options = {
    //                     hostname: parsedUrl.hostname,
    //                     port: parsedUrl.port || (parsedUrl.protocol === 'http' ? 80 : 443),
    //                     path: parsedUrl.path + parsedUrl.hash + parsedUrl.search,
    //                     method: _interface.method
    //                 };
    //                 const result = await Toolbox.sendHttpRequest(options, leadRequest.lead);
    //                 // update lead with the result and mark sent=true/false
    //                 debugger;
    //                 break;
    //             case 'email':
    //         }

    //         // post lead send

    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

module.exports = CampaignModule;