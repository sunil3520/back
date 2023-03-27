const express=require("express");
const {UserModel}=require("../models/user.models");
const UserRoutes=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

UserRoutes.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user){
            res.status(200).send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 4, async(err, hash)=> {
                const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"Registration successful"})
            });
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


UserRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
         const user=await UserModel.findOne({email});
         if(user){
            bcrypt.compare(password, user.password, (err, result) =>{
                if(result){
                    res.status(200).send({"msg":"Login successful",token:jwt.sign({userId:user._id},"masai")})
                }else{
                    res.status(400).send({"msg":"Wrong crendtial"})
                }
            });
         }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})











module.exports={UserRoutes}