const {Schema,model}=require('mongoose');
const mongoose =require('mongoose');
const inventorySchema= new Schema({
  id:{
   type:String,
   required:true,
  },
  sku:{
    type:String,
    unique:true,
  },
 actionType: {
        type: String,
        enum : ['IN','OUT'],
        default: 'empty'
    },
  quantity:{
    type:Number,
    default:0,
  },
  productId:{
    type:Array,
    ref:'product'
  },
  historis:{
    type:Array,
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
   required:true,
  },
  actionType: {
        type: String,
        enum : ['IN','OUT'],
        default: 'empty'
    },
  quantityChange:{
    type:Number,
  },
  lastQuantity:{
    type:Number,
  },
  newQuantity:{
    type:Number,
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