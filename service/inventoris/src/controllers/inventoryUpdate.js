const {Inventory,History} =require('../schemas.js');
const updateInventory =async(req,res,next)=>{
  try{
    const {id} = req.params;
    const data ={...req.body}
    const inventory = await Inventory.findOne({inventoryId:id});
   const userId = inventory._id;
   const inventoryIdFind = inventory.inventoryId;
    if(!inventory){
      res.status(404).json({success:false, message:"inventory not found"})
      return;
    }
    //last history
    const history =  await History.find()
   const lastHistory= history.toSorted((a,b)=>b.createAt - a.createAt);
   //change quantity
    let newQuantity = inventory.historis[0].newQuantity || 0;
    console.log(newQuantity)
    if(data.actionType == "IN"){
      newQuantity += Number(data.quantity);
    }else{
      newQuantity -= Number(data.quantity);
    };
    
  const updateOptions= { new:true, runValidators:true, context:'query'};
    const filter =  {
    inventoryId:inventoryIdFind,
  quantity:Number(newQuantity),
    historis:{
    historyId:inventoryIdFind,
      actionType:data.actionType,
      quantityChange:Number(data.quantity),
     newQuantity:newQuantity,
     lastQuantity:lastHistory[0]?.newQuantity || 0
    }
  }
  //update Inventory
    const updateResult = await Inventory.findByIdAndUpdate(userId,filter,updateOptions);
    
    //updata history 
      //create a new history
  const historyResult =new History({historyId:inventoryIdFind,actionType:data.actionType,
      quantityChange:data.quantity,
     newQuantity:newQuantity,
     lastQuantity:lastHistory?.newQuantity || 0});
  await historyResult.save();
  //end history creade
  
    res.json({success:true, message:"update successfull", result:updateResult});
  }catch(error){
    res.status(500).json({message:error.message})
  }
}
module.exports = updateInventory;