import express from "express"    
import mongoose from "mongoose";
import router from "./routes/userroutes.js";
import blogRouter from "./routes/blog-routes.js"; 
import cors from "cors";
import * as dotenv from 'dotenv'
dotenv.config();
const app=express();    
app.use(cors());
app.use(express.json());  
app.use("/api/user",router) ; 
app.use("/api/blog",blogRouter); 

mongoose.connect(process.env.CONNECTION_URL).then(()=>app.listen(5000)) 
  .then(()=>console.log("connected to database"))
  .catch((err)=>console.log(err))

