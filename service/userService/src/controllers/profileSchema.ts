const { Schema, model } =require('mongoose');
const profileSchema = new Schema({
  authUserId:{
    type:String,
    unique:true,
  },
  bio_data:{
    type:String,
    default:null,
  },
  divition:{
   type:String,
   default:null,
  },
  district:{
   type:String, 
   default:null
  },
  address:{
    type:String,
    trim:true,
    default:null
  },
  phone:{
    type:Number,
    trim:true,
    default:null,
  },
  image:{
    type:String,
    default:"image is empty"
  },
 cover_image:{
    type:String,
    default:"cover-image is empty"
  }, 
},{timestamp:true});
 const ProfileModel = new model('profile', profileSchema);
export default ProfileModel;
