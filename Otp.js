const mongoose=require("mongoose");
const otpSchema=new mongoose.Schema({
  Email:{
    type:String,
    required:true
  },
  Otp:{
    type:Number,
    required:true
  },
Expiry:{
  type:Date,
  required:true
}
});
module.exports=mongooose.model({"Otp",otpSchema});
