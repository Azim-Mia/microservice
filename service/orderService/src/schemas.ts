const { Schema, model } =require('mongoose');
const orderSchema= new Schema({
  id:{
    type:String,
    unique:true,
    require:[true, "Id not empt authId"],
  },
  userId:{
    type:String,
    require:[true, "userId not empt authId"],
  },
  userName:{
    type:String,
    trim:true,
    tolowercase:true,
    required:[true, "not empt name"],
    minLength:[3, 'min length three character'],
    maxLength:[100, "max length 100"]
  },
  userEmail:{
    type:String,
    unique: false,
    trim:true,
    tolowercase:true,
    required:[true, "not empt Email"],
    maxLength:[100, "max length 100"],
  },
   subtotal:{
     type:Number,
     default:0
   },
   tax:{
     type:Number,
     default:0
   },
   grandTotal:{
     type:Number,
     default:0,
   },
   status:{
     type:String,
     enum:["PENDING", "SHIPED", "CONFIRM", "DELIVERED", "CANCELLED"],
     default:"PENDING",
   },
orderItems: [],
  createAt:{
    type:Date,
    default:Date.now,
  },
  updateAt:{
    type:Date,
    default:Date.now,
  }
},{timestamp:true});
export const OrderDetailModel = new model('Order', orderSchema);

const orderItemSchema = new Schema({
  orderId:{
    type:String,
    unique:false,
    require:[true, "userId must be required"],
  },
productId:{
  type:String,
  required:[true, "productId not empty"],
},
productName:{
  type:String,
  required:[true, "productName not empty"],
},
sku:{
  type:String,
  required:[true, "sku not empty"],
},
price:{
  type:Number,
  required:[true, "price not empty"],
},
quantity:{
  type:Number,
  required:[true, "quantity not empty"],
},
total:{
  type:Number,
  required:[true, "Total not empty"],
}
});
export const OrderItemModel = new model('OrderItem', orderItemSchema);