const nodemailer = require('nodemailer');
const serviceConfig = require('./serviceConfig');

const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: serviceConfig.GMAIL_USER,
        pass :serviceConfig.GMAIL_PASS
    }
});

module.exports = transporter;