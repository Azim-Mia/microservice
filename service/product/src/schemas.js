const {Schema, model} =require("mongoose");
const productSchema = new Schema({
  id:{
    type:String,
    required:[true, "product id is empty"],
  },
  inventoryId:{
    type:String,
  },
  name:{
   type:String, 
   required:[true, "name is empty"],
  },
  sku:{
    type:String,
    required:[true, "sku is required"],
  },
  description:{
    type:String,
  },
  price:{
    type:Number,
  required:[true, "Price is empty"],
  },
  image:{
    type:String,
    default:null,
  },
  status:{
    type: String,
    enum:["DRAFT", "PUBLIST", "UNLISTED"],
    default:"DRAFT",
  },
  createAt:{
    type:Date,
    default:Date.now,
  },
  updateAt:{
    type:Date,
    default:Date.now, 
  }
});
const Product = new model('product', productSchema);
module.exports = Product;