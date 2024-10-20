const {Inventory,History} =require('../schemas.js');
const findSingle = async(req,res,next)=>{
  try{
  const {id} =req.params;
    const findInventory = await Inventory.findOne({id:id})
    const findHistory = await History.findOne({id:id})
    if(!findInventory && ! findHistory){
      res.json({success:false, message:"Inventory && History not found"});
      return
    }else{
      res.json({success:true, message:"return successfull",result:findHistory, history:findHistory});
    }
  }catch(error){
    res.json({success:false, message:"Internal problem"});
  }
}
module.exports = findSingle;