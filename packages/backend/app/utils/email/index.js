const nodemailer = require('nodemailer');
const config = global.App.Config.mailer;

// create transporters
const transporters = {};
config.transporters.forEach(t => transporters[t.service] = nodemailer.createTransport(t));

module.exports = {
    send: (to, subject, text, service = 'gmail') => {
        return new Promise((resolve, reject) => {
            const transporter = transporters[service];
            if (!transporter) {
                return reject(`Unkown service ${service}`);
            }
            transporter.sendMail({ to, subject, text }, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
};