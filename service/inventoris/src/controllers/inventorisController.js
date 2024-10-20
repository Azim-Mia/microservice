const {Inventory,History} =require('../schemas.js');
const { v4: uuidv4 } = require('uuid');
const inventorisController =async(req,res,next)=>{
try{
  const data ={...req.body,id:uuidv4(),historis:{
      actionType:req.body.actionType,
      quantityChange:req.body.quantity,
      lastQuantity:0,
      newQuantity:req.body.quantity,
},
};
const matchResult = await Inventory.findOne({sku:req.body.sku});
if(matchResult){
  res.json({success:false,message:"Sku already exits"});
  return;
}
const pendingInventory = new Inventory(data);
const resultInventory = await pendingInventory.save();
const pendingHistory = new History(data);
const resultHistory = await pendingHistory.save();
res.status(201).json({message:"create successfull"});
}catch(error){
  res.status(404).json({message:error.message})
}
}
module.exports ={inventorisController}