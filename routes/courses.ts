import  express from "express";
const router = express.Router();
import Course from "../db/Courses";


router.get('/',async(req,res)=>{
    const course=await Course.find();
    if(!course)
    res.json({message:"Error finding any course"})
   return res.json(course);
   })
   
   router.get('/:id', async (req, res) => {
     const courseId = req.params.id; // Get the course ID from the URL params
     try {
       const course = await Course.findById(courseId); // Use findById to find a course by ID
   
       if (!course) {
         return res.status(404).json({ message: 'Course not found' });
       }
       return res.json(course);
     } catch (error) {
       console.error('Error:', error);
       return res.status(500).json({ message: 'Internal Server Error' });
     }
   });

   module.exports=router;