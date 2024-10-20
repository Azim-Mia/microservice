const {Inventory,History} =require('../schemas.js');
const { v4: uuidv4 } = require('uuid');
const updateInventory =async(req,res,next)=>{
  try{
    const {id} = req.params;
    const data ={...req.body}
    const inventory = await Inventory.findOne({_id:id});
   const userId = inventory._id;
    if(!inventory){
      res.status(404).json({success:false, message:"inventory not found"})
      return;
    }
    //last history
    const history =  await History.find()
   const lastHistory= history.toSorted((a,b)=>b.createAt - a.createAt);
   //change quantity
    let newQuantity = inventory.historis[0].newQuantity;
    if(data.actionType == "IN"){
      newQuantity += data.quantity;
    }else{
      newQuantity -= data.quantity;
    };
    
  const updateOptions= { new:true, runValidators:true, context:'query'};
    const filter =  {
  quantity:newQuantity,
    historis:{
      actionType:data.actionType,
      quantityChange:data.quantity,
     newQuantity:newQuantity,
     lastQuantity:lastHistory[0]?.newQuantity || 0
    }
  }
  //history create
  const historyResult =new History({id:uuidv4(),actionType:data.actionType,
      quantityChange:data.quantity,
     newQuantity:newQuantity,
     lastQuantity:lastHistory?.newQuantity || 0});
  await historyResult.save();
  //end history creade
  
  //update state
    const updateResult = await Inventory.findByIdAndUpdate(userId,filter,updateOptions);
    res.json({success:true, message:"update successfull", result:updateResult});
  }catch(error){
    res.status(500).json({message:error.message})
  }
}
module.exports = updateInventory;