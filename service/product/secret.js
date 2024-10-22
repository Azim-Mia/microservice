require('dotenv').config();
const server_port = process.env.SERVER_PORT || 5001;
const db_url = process.env.DB_URL || "127.0.0.1/productTable";
const inventory_url =  process.env.INVENTORY_URL || 4002
module.exports = { server_port, db_url, inventory_url};