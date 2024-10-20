const mongoose = require('mongoose');
const {db_url} =require("../secret.js");
const connectDB =async()=>{
const result = await mongoose.connect(db_url)
if(!result){
  console.log("mongoose problem disconnect")
}else{
  console.log("inventory model is connected");
}
}
module.exports = connectDB;