import {connectDB} from './config/db';
import {default as app} from './app';
require('dotenv').config();
const server_port = process.env.SERVER_PORT || 5003
app.listen(server_port,()=>{
  console.log(`http://localhost:${server_port}`);
  connectDB()
});