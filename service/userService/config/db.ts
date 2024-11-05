import mongoose from 'mongoose';
require('dotenv').config();
const db_url = process.env.DB_URL || "mongodb://127.0.0.1/UserDB";
export const connectDB =async()=>{
  try{
 await mongoose.connect(db_url);
 console.log('user db database connected');
  }catch(error){
    if(error instanceof mongoose.Error){
      console.log(error.message);
      return;
    }
    throw new Error ("MongoDB ERROR Atlas problem Cheack Network or URL");
  }
}