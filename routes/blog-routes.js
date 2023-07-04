import express from "express";  
import { addBlog, deleteBlog, getAllBlogs, getByUserId, getbyid, updateblog } from "../controllers/blog-contoller.js";

const blogRouter=express.Router();  
blogRouter.get("/",getAllBlogs);  
blogRouter.post("/add",addBlog); 
blogRouter.put("/update/:id",updateblog) ;
 blogRouter.get("/:id",getbyid); 
 blogRouter.delete("/:id",deleteBlog) 
 blogRouter.get("/user/:id",getByUserId)
export default blogRouter;