const Product = require('../schemas.js');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const createProduct = async(req,res,next)=>{
try{
const matchData = await Product.findOne({sku:req.body.sku});
if(matchData){
  res.status(200).json({success:false, message:"product Already exist"});
  return;
}
//data initiallize
const data = {id:uuidv4(), inventoryId:"",...req.body};
const addProduct =new Product(data);
//data initiallize
const datas ={
  sku:data.sku,
  productId:data.id,
  quantity:req.body.quantity || 0,
  actionType:req.body.actionType || "IN",
  historis:{
    actionType:req.body.actionType || "IN",
      quantityChange:req.body.quantity || 0,
      lastQuantity:0,
      newQuantity:req.body.quantity || 0,
  }
};
// create inventory this product
const inventoryCreateSuccess = await axios.post('http://localhost:4002/inventory',datas);
if(!inventoryCreateSuccess.data){
  res.json({success:false,message:"Product route from inventory problem"});
}
// inventory id use as product key inventoryId..
const inventoryId=inventoryCreateSuccess.data.resultInventory.id;

//update product add inventoryId
if(inventoryId){
 addProduct.inventoryId=inventoryId; 
}

//finaly save product
const result = await addProduct.save();
if(!result){
  res.json({success:false,message:"Product crate problem"});
  return;
}
//response result
res.json({success:true, message:"successfull", result:result});
}catch(error){
  res.json({message:error.message});
}
}
module.exports =createProduct;