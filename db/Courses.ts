const mongoose=require("mongoose")

    
    
const Courseschema=new mongoose.Schema({
   name:String,
   description:String,
   image:String,
   teacher:String,
   provider:String
})

export default mongoose.model('Course',Courseschema);
