const mongoose=require("mongoose");
const likedSchema=new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  cart:{
    [
      productId:String
    ]
  }
});
module.exports=mongoose.modles("LikedProduct",likedSchema);
                                      
