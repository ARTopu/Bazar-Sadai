require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3002;
const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/BazarSadaiDB";
const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'sd5lkf9jsd3fn45lks4fdsl6dk4';
const smtpUsername = process.env.SMTP_USERNAME || '';
const smtpPassword = process.env.SMTP_PASSWORD || '';
const clientURL =process.env.CLIENT_URL || '';

module.exports = {serverPort, mongodbURL,defaultImagePath,jwtActivationKey,smtpUsername,smtpPassword,clientURL};