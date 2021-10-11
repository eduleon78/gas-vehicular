const nodemailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alessandro.abbott22@ethereal.email',
        pass: 'nH5MKRc3EpZ7FmNuG3'
    }
};

module.exports = nodemailer.createTransport(mailConfig);