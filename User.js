const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
  EmailId:{
    type:string,
    required:true
  },
  UserId:{
    type:string,
    required:true
  },
  UserName:{
    type:string,
    required:true
  },
  College:{
    type:string,
    required:true
  },
  password:{
    type:string,
    required:true
  }
});
module.export=model.mongoose("User",UserSchema);
