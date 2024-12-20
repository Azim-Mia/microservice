const {Inventory,History} =require('../schemas.js');
const deleteInventory = async(req,res,next)=>{
  try{
  const {id} = req.params;
  const deleteInventory = await Inventory.deleteOne({inventoryId:id});
  if(deleteInventory.deletedCount==0){
    res.json({success:false, message:"not found inventory"})
    return
  }else{
   return res.json({success:true, message:'inventory deleted'}) 
  }
}catch(error){
 res.json({success:false,message:"internal problem"}); 
}
  }
module.exports = deleteInventory;