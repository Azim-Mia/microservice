const axios =require('axios');
const readProduct = async(req,res,next)=>{
  const find= await axios.get('http:localhost:4002/inventory');
  const result = find.data;
  console.log(result)
}
module.exports =readProduct;