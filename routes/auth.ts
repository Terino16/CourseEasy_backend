import  User from '../db/User';
import express from 'express';
const router = express.Router();
import  bcrypt from 'bcryptjs';
const bcryptSalt=10;
import jwt from "jsonwebtoken";
import {z} from "zod";
const secretKey = "Anubhavbjpneta";
import {authenticate} from "../middlewares/index";


let SignupInputs=z.object({
  name:z.string().min(1),
  email:z.string().min(1),
  password:z.string().min(1),
})

router.post('/Signup', async (req, res) => {
  const SignupInput=SignupInputs.safeParse(req.body);
  if(!SignupInput.success)
  {
    return res.status(411).json({"message":"Input error"});
  }
    const {name,email,password}=SignupInput.data;
    if (!email || !password ||!name) {
      return res.sendStatus(400);
    }
    console.log(req.body);
       try {

      const existingUser=await User.findOne({email});
      if(existingUser)
        return res.json({message:"User Already exist"})
       const user=await User.create({
          name,
          email,
          password:bcrypt.hashSync(password,bcryptSalt)
        });

        const id=user._id

        console.log("user doc created")
        const token = jwt.sign({email}, secretKey,{expiresIn:"1h"})
        return res.json({"Message":"User created",token,name,id});
      } catch (err) {
        console.error(err,"Eror");
      }
    })
  
  router.post('/Login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      return res.sendStatus(400);
    }
    const name=existingUser.name;
    const id=existingUser._id;
    if(!name)
    {
      return res.status(500).json({message:'No Name Found'});
    }
    const token = jwt.sign({email}, secretKey,{expiresIn:"1h"})
    res.json({"message":"User Logged in",token,name,id});
  });

  router.get('/:id' , async(req,res)=>{
    const userId = req.params.id; 
    console.log(userId);
    try {
      const user = await User.findById(userId); 
  
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      return res.json(user);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  })


  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, email, dob, gender, about } = req.body;
  
    try {
      // Fetch the user excluding the password field
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user fields except for password
      user.name = name || user.name;
      user.email = email || user.email;
      user.dob = dob || user.dob;
      user.gender = gender || user.gender;
      user.about = about || user.about;
  
      // Save the updated user document
      await user.save();
  
      return res.json(user);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  module.exports=router;