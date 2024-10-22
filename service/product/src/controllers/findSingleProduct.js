const Product = require('../schemas.js');
const axios = require('axios');
const {inventory_url} =require('../../secret.js');
const findSingleProduct = async(req,res,next)=>{
try{
  const {id}=req.params;
  let inventoryId;
  const findProduct = await Product.findOne({id:id});
  //console.log(userId);
  if(!findProduct){
  return  res.status(404).json({success:false, message:"Not found Product this " + id});
  };
  const userId = findProduct._id;
if(findProduct.inventoryId === "null"){
const datas ={
   id:findProduct._id,
  sku:findProduct.sku,
  productId:findProduct._id,
};
  const createInventory = await axios.post("http://localhost:4002/inventory",datas);
  console.log(createInventory.data)
  //asign value inventoryId
  inventoryId = createInventory.data.resultInventory.id;
  //cheack value
  if(!createInventory){
    res.status(404).json({success:false, message:"inventory not create"})
  }else{
    const updateOptions= { new:true, runValidators:true, context:'query'};
    const filter =  {
   inventoryId:inventoryId,
  }
  const  result =await Product.findByIdAndUpdate(userId, filter, updateOptions);
  console.log(result);
  }
};
res.status(200).json({success:true, message:"successfull", findProduct});
}catch(error){
  res.status(500).send(error.message);
}
}
module.exports =findSingleProduct;