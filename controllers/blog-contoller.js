 import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
 export const getAllBlogs=async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find().populate('user'); 
    } catch(err){
        return console.log(err);
    } 
    if(!blogs){
        return res.status(404)
                        .json({
                            message:"No Blogs Found"
                        })
    } 
    return res.status(200)
                    .json({blogs})
} 
export const addBlog=async(req,res)=>{
    const {title,description,image,user}=req.body;  
    let  existingUser;
    try{ 
        existingUser=await User.findById(user);

    }catch(err){
        console.log(err);
    } 
    if(!existingUser){
        return res.status(400)
                         .json({
                            message:"unable to find user by this id "
                         })
    }
    const blog= new Blog({
        title,
        description,
        image,
        user,
    });    
    try{
        await blog.save()
    }catch(err){
         console.log(err); 
         return res.status(500)
                        .json({
                            message:err
                        })
    }
        return res.status(200)
                .json({blog})

} ;   


export const updateblog=async(req,res,next)=>{
    const{title,description}=req.body;  
    const blogId=req.params.id; 
    let blog; 
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
        title,
        description   
         })  
      }catch(err){
        return console.log(err);
      }  
      if(!blog){
        return res.status(500)
                       .json({
                        message:"unable to update  the blog "
                       })
      }  
      return res.status(200)
                     .json({blog})
}; 
export const getbyid=async(req,res,next)=>{
    const id=req.params.id; 
    let blog;
    try{
    blog= await Blog.findById(id);
    }catch(err){  

    } 
if(!blog){
    res.status(404)
        .json({
               message:"No Blog Found"
        })  
} 
return res.status  (200).json({blog}); 
}    

export const deleteBlog=async(req,res,next)=>{
     const id =req.params.id; 
     let blog;
     try{ 
        blog=await Blog.findByIdAndRemove(id).populate('user'); 
        await blog.user.blogs.pull(blog) 
        await blog.user.save();

     }catch(err){
        return console.log(err);
     } 
     if(!blog){
        return res.status(500) 
                       .json({
                        message:"unable to delete"
                       })
     } 
     return res.status(200)
                     .json({
                         message:"successfully Deleted"
                     })
} 
export const  getByUserId=async(req,res,next)=>{ 
    const userId=req.params.id;
    let userBlogs; 
    let user;
    try{
        user = await User.findById(userId)
        userBlogs= await Blog.find({user:userId});
    }catch(err){
        return console.log(err);
    } 
    if(!userBlogs){
        return res.status(404)
                      .json({
                        message:"no blog found"
                      })
    } 
    return res.status(200)
                   .json({ user:user, blogs:userBlogs})

}
