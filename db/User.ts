import  mongoose from "mongoose";
const  { Schema }=mongoose
    
    
const Userschema=new Schema({
   name:String,
   email: {type:String,unique:true},
   password:String
})

export default mongoose.model('User',Userschema);