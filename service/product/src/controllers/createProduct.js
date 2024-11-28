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
const data = {productId:uuidv4(), inventoryId:"",...req.body};

//product id need for inventory create
const addProduct =new Product(data);

//create inventory data 
const datas ={
  sku:data.sku,
  productId:data.productId,
};
// create inventory
const inventoryCreateSuccess = await axios.post('http://localhost:4002/inventoris/create',datas);
console.log(inventoryCreateSuccess.data)
if(!inventoryCreateSuccess.data){
  return res.json({success:false,message:"Product create not successfull "});
}
// inventory id use as product key 

const {inventoryId, quantity}=inventoryCreateSuccess.data.resultInventory;
console.log(inventoryId, quantity)
//update product start...
 addProduct.inventoryId=inventoryId || null;
 addProduct.stock = quantity || 0;
 if(quantity> 0){
   addProduct.stockStatus ="in stock";
 }
//update product end...

//finally save product
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