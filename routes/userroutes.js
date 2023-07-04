import express from "express"   
import { getAllUser,login,sign_up } from "../controllers/usercontroller.js";

const router=express.Router(); 
router.get("/",getAllUser);    
router.post("/signup",sign_up); 
router.post("/login",login); 


export default router
