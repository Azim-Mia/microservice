const {Inventory,History} =require('../schemas.js');
const inventoryFindAll = async(req,res,next)=>{
  try{
    const result =  await Inventory.find()
    const history =  await History.find()
    if(!result && !history){
      res.status(404).json({success:false, message:"Not found"})
    }
    const dsen = history.toSorted((a,b)=>b.createAt -a.createAt);
    res.status(200).json({success:true, message:"inventory return successfull", result:result, history:dsen});
  }catch(err){
    res.status(500).json({success:false, message:"server or mongoose problem"})
  }
}
module.exports = inventoryFindAll