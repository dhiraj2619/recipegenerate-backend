require('dotenv').config();

const webport = process.env.PORT;
const mongourl = process.env.MONGO_URI
const secret_key = process.env.SECRET_KEY
const google_client_id = process.env.GOOGLE_CLIENT_ID
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET
const facebook_app_id = process.env.FACEBOOK_APP_ID
const facebook_client_secret = process.env.FACEBOOK_CLIENT_SECRET

module.exports = {webport,mongourl,secret_key,google_client_id,google_client_secret,facebook_app_id,facebook_client_secret}