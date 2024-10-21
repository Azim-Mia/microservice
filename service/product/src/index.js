const app =require('./app.js');
const connectDB = require("../config/db.js");
const {server_port} = require("../secret.js")
app.listen(server_port, ()=>{
  console.log(`http://localhost:${server_port}`);
  connectDB();
});