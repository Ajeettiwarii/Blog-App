import express from "express"    
import mongoose from "mongoose";
import router from "./routes/userroutes.js";
import blogRouter from "./routes/blog-routes.js"; 
import cors from "cors";
const app=express();    
app.use(cors());
app.use(express.json());  
app.use("/api/user",router) ; 
app.use("/api/blog",blogRouter); 

mongoose.connect("mongodb://localhost:27017",{
    dbName:"Blog"
}).then(()=>app.listen(5000)) 
  .then(()=>console.log("connected to database"))
  .catch((err)=>console.log(err))

