  
import User from "../models/User.js"; 
import bcrypt from "bcrypt";

   export const getAllUser=async(req,res,next)=>{
    let users;
    try{   
        users=await User.find();

    } catch(err){
        console.log(err)
    } 
    if(!users){ 
        return  res.status(404) 
                        .json({
                            message:"No Users Found"
                        })
    } 
    return res.status(200).json({users})
  } 

  export const  sign_up=async(req,res,next)=>{
    const{name,email,password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    } 
    catch(err){
        console.log(err);
    }  
    if(existingUser){
        return res.status(400)
                       .json({
                        message:"user already exisit ! login Instead "
                       })
    } 
    const user=await  User.create ({
        name,
        email, 
        password  ,
        blogs:[ ]
    });
       return res.status(201)
                   .json({user})
  } 
  export const signup=async(req,res,next)=>{ 
    const{name,email,password}=req.body;
    let exixtingUser;
    try{
        exixtingUser=await User.findOne({email});
    } catch(err){
        console.log(err);
    } 
    if(exixtingUser){
        return res.status(400)
                       .json({
                        message:"User already exists"
                       })
    }    
    const hashedpassword=await bcrypt.hash(password,10);
    const user=User.create({name,email,password:hashedpassword});   
   
    return res.status(201)
                    .json({user})
     
  }   

  export const login = async(req,res,next)=>{ 
    const{email,password}=req.body;  
    let existingUser;
    try{
        existingUser=await User.findOne({email})
    } catch(err){
        return console.log(err);
    } 
    if(!existingUser){
        return res.
                  status(404) 
                  .json({message:"could not find user of this email"})
    } 
     const ispasswordCorrect=bcrypt.compare(password,existingUser.password) 
     if(!ispasswordCorrect){
 return  res.status(400)
             .json({
                message:"Incorrect Message"
             })
     }   
     return res.status(200)
                     .json({message:"Login Successfull",user:existingUser})

  }