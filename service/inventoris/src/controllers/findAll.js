const {Inventory,History} =require('../schemas.js');
const inventoryFindAll = async(req,res,next)=>{
  try{
    const result =  await Inventory.find()
    if(!result){
      res.status(404).json({success:false, message:"Not found"})
    }
    res.status(200).json({success:true, message:"inventory return successfull",result:result});
  }catch(err){
    res.status(500).json({success:false, message:"server or mongoose problem"})
  }
}
module.exports = inventoryFindAll