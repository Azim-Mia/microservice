require('dotenv').config();
const db_url = process.env.DB_URL || "127.0.0.1/inventory"
module.exports ={db_url};