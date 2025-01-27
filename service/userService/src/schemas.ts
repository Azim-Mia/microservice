const { Schema, model } =require('mongoose');
import { uuid } from 'uuidv4';
const userSchema = new Schema({
  authUserId:{
    type:String,
    default:"default_" + uuid(),
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
    unique:true,
  },
  address:{
    type:String,
    trim:true
  },
  phone:{
    type:Number,
    trim:true,
  },
  image:{
    type:String,
    default:"image is empty"
  }
},{timestamp:true});
 const User = new model('User', userSchema);
export default User;
