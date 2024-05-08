const mongoose=require("mongoose")

    
    
const Courseschema=new mongoose.Schema({
   name:String,
   description:String,
   tags:String,
   reviews:Array,
   image:String,
   teacher:String,
   provider:String
})

export default mongoose.model('Course',Courseschema);
