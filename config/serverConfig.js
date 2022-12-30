// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    debug: process.env.DEBUG,
    port: process.env.APP_PORT,
};