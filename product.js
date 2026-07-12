const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
  ProductName:{
    type:String,
    required:true
  },
  Cost:{
    type:String,
    required:true
  },
  SellerName:{
    type:String,
    required:true
  },
  ImageUrl:{
    type:String,
    required:true
  }
});
module.exports=mongoose.model("Products",ProductSchema);
  
  
  
