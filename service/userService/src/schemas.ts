const { Schema, model } =require('mongoose');
const userSchema = new Schema({
  authUserId:{
    type:String,
    unique:true,
  },
  name:{
    type:String,
    trim:true,
    tolowercase:true,
    minLength:[3, 'min length three character'],
    maxLength:[100, "max length 100"]
  },
  email:{
    type:String,
    trim:true,
    maxLength:[100, "max length 100"],
  },
  address:{
    type:String,
    trim:true
  },
  phone:{
    type:Number,
    trim:true,
  }
},{timestamp:true});
export const User = new model('userModel', userSchema);
