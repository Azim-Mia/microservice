import {Request, Response, NextFunction} from 'express';
import axios from 'axios';
import {z} from 'zod';
const { uuid } = require('uuidv4');
import {OrderDetailModel,OrderItemModel} from '../schemas';
import {orderSchema, orderItemsSchema} from './parseBodyValidate'
const checkOut= async(req:Request, res:Response, next:NextFunction)=>{
  //decliar variable
  let cardData, cardItemsData;
  //body data validate 
   const parseBody = orderSchema.safeParse(req.body);
   //body data is exists
   if(!parseBody.success){
     return res.status(400).json({success:false, message:parseBody.error.errors});
   };
   try{
     //get card all product
    const {data} = await axios.get("http://localhost:4006/card/me",{
     headers:{
       'x-card-session-id':parseBody.data.cardSessionId,
       },
   }); 
   //all data store
   cardData = data?.items;
   //create array orderItemsSchema data ;
  const cardItems = z.array(orderItemsSchema).safeParse(cardData);
  //check data empty
if(cardItems.data?.length == 0){
  return res.status(400).json({success:false, message:"cardItems is empty"});
};
//asign value  cardItemsData
cardItemsData = cardItems?.data;
if(!cardItemsData)return;

//create array promise 
const orderDetails = Promise.all(cardItemsData.map(async(item)=>{
  const { data: product } = await axios.get(`http://localhost:4001/products/find/${item.productId}`);
    return {
    productId:product.findProduct.productId as string,
    productName:product.findProduct.name as string,
    sku: product.findProduct.sku as string,
    price: product.findProduct.price,
    quantity:item.quantity,
    total: product.findProduct.price * item.quantity,
  }
}));
// resolve data Promise
const orderItemsData = await orderDetails;
const subtotal = orderItemsData.reduce((acc, item)=>acc + item.total, 0);
const tax= 0;
  const grandTotal = subtotal + tax;
  const orderInitialData ={
  id:uuid(),
  userId:parseBody.data.userId,
  userName:parseBody.data.userName,
  userEmail:parseBody.data.userEmail,
  subtotal:subtotal,
  tax:tax,
  grandTotal:grandTotal,
  orderItems:{
    create:orderItemsData.map((item)=>({
      ...item,
    })),
  }
};
//create order 
const createOrder = new OrderDetailModel(orderInitialData);
const result =await createOrder.save();
const productAllItem = orderItemsData.map((item)=>({
      orderId:createOrder.id,
      ...item,
    }));
  const orderId =productAllItem.map(item => item.orderId);
    //create orderitem
  await OrderItemModel.insertMany(productAllItem);
  //clear card
   await axios.get("http://localhost:4006/card/clear",{
     headers:{
       'x-card-session-id':parseBody.data.cardSessionId,
       },
   }); 
   // semd email 
   await axios.post(`http:localhost:4005/email/send`,{
     recipient:parseBody.data.userEmail,
     subject:"successfull order",
     body:`<div> 
     <h1> Amount:${grandTotal}</h1>
     <h2>orderId : ${orderId}</h2>
     </div>`,
     source:parseBody.data.userEmail,
     sender:"Azim",
   });
return res.status(200).json({
  success:true, message:'order create successfull',
  payload:{
    result,
  }
})


   }catch(error:any){
 console.log(error)
  if(error.status == "400"){
    return res.status(400).json({message:"order session Id is not valid"});
   }
   return res.status(400).json({message:"Internal Server Error"});
  }
}
export default checkOut;