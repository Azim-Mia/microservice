const Product = require('../schemas.js');
const deleteProduct = async(req,res,next)=>{
const productId = req.body.productId;
const deleteId = await Product.deleteOne({productId:productId});
if(!deleteId){
return res.status(400).json({success:false, message:"product id is not found"});
}
return res.status(200).json({success:true, message:"product id delete successfull"});
}
module.exports =deleteProduct;