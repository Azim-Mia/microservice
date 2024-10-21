const findSingleProduct = async(req,res,next)=>{
  const result = await fetch('http:localhost:4002/inventory');
  const data = result.json();
  console.log(data);
}
module.exports =findSingleProduct;