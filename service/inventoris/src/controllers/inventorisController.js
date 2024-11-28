const {Inventory,History} =require('../schemas.js');
const { v4: uuidv4 } = require('uuid');
const inventorisController =async(req,res,next)=>{
try{
const data ={inventoryId:uuidv4(),
actionType:req.body.actionType || null,
...req.body,
  historis:{
      quantityChange:Number(req.body.quantity),
      lastQuantity:0,
      newQuantity:Number(req.body.quantity),
},
}

const matchResult = await Inventory.findOne({sku:req.body.sku});
if(matchResult){
  res.json({success:false,message:"Sku already exits"});
  return;
}
const pendingInventory = new Inventory(data);
const resultInventory = await pendingInventory.save();
//cteate history
const historyData ={historyId:data.inventoryId, ...req.body}
const pendingHistory = new History(historyData);
const resultHistory = await pendingHistory.save();
 return res.status(201).json({success:true, message:"create successfull",resultInventory});
}catch(error){
  res.status(404).json({message:error.message})
}
}
module.exports ={inventorisController}