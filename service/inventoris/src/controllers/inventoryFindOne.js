const {Inventory,History} =require('../schemas.js');
const findSingle = async(req,res,next)=>{
  try{
  const {id} =req.params;
    const findInventory = await Inventory.findOne({id:id})
    const history = await History.find();
    //decending History
    const dscn = history.toSorted((a,b)=>b.createAt - a.createAt);
    if(!findInventory){
      res.json({success:false, message:"Inventory && History not found"});
      return
    }else{
      res.json({success:true, message:"return successfull",result:findInventory, History:dscn});
    }
  }catch(error){
    res.json({success:false, message:"Internal problem"});
  }
}
module.exports = findSingle;