import express from 'express';
import  cookieParser  from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
const port = 3001
const app = express();
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();
const userroutes=require("./routes/auth");
const courseroutes=require("./routes/courses");
app.use(cors());


const mongoDBUrl = process.env.MONGODB_URL;
if (!mongoDBUrl) {
  throw new Error('MONGODB_URL environment variable is not set');
}

mongoose.connect(mongoDBUrl).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));
app.use("/courses",courseroutes);
app.use("/user",userroutes);

console.log("Testing");


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



