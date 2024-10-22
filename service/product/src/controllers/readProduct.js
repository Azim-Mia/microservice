const Product = require('../schemas.js');
const axios =require('axios');
const readProduct = async(req,res,next)=>{
try{
  const findProduct = await Product.find().select("name _id productId inventoryId price quantity");
  if(!findProduct){
    res.status(404).json({success:false, message:"Product is not found"});
  return;
  };
  res.status(200).json({success:true, message:"Product return successfull",findProduct});
}catch(error){
  res.status(500).json({success:false, message:"Interneal server problem"});
}
}
module.exports =readProduct;