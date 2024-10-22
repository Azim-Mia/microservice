const {Schema,model}=require('mongoose');
const mongoose =require('mongoose');
const inventorySchema= new Schema({
  id:{
   type:String,
  },
  sku:{
    type:String,
    unique:true,
  },
 actionType: {
        type: String,
        enum : ['IN','OUT'],
        default:null,
    },
  quantity:{
    type:Number,
    default:0,
  },
  productId:{
    type:String,
    default:"null",
  },
  historis:{
    type:Array,
  default:[{actionType:"IN",
      quantityChange:0,
      lastQuantity:0,
      newQuantity:0}]
  },
  createAt:{
    type:Date,
    default: Date.now
  },
  updateAt:{
     type:Date,
    default: Date.now,
  }
});
const Inventory=new model('inventory', inventorySchema);

const historySchema= new Schema({
  id:{
   type:String,
   required:[true, 'id is empty'],
  },
  actionType: {
        type: String,
        enum : ['IN','OUT'],
        default:null,
    },
  quantityChange:{
    type:Number,
  },
  lastQuantity:{
    type:Number,
  },
  newQuantity:{
    type:Number,
    default:0,
  },
  inventory:{
    type:Array,
    ref:'inventory'
  },
  inventoryId:{
    type:String,
  },
  createAt:{
    type:Date,
    default: Date.now
  },
  updateAt:{
     type:Date,
    default: Date.now,
  }
});
const History=new model('history', historySchema);
module.exports={Inventory, History};