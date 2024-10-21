const {Inventory,History} =require('../schemas.js');
const deleteInventory = async(req,res,next)=>{
  try{
  const {id} = req.params;
  const deleteHistory = await History.deleteOne({id:id});
  
  if(deleteHistory.deletedCount ==0){
    res.json({success:false, message:"not found inventory"})
    return
  }else{
   return res.json({success:true, message:'inventory and history deleted'}) 
  }
}catch(error){
 res.json({success:false,message:"internal problem"}); 
}
  }
module.exports = deleteInventory;