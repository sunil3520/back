const express=require("express");
const {PostModel}=require("../models/post.models");
const postRoutes=express.Router();
const jwt=require("jsonwebtoken");


postRoutes.get("/",async(req,res)=>{

    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"masai")
    const {device,device1,device2}=req.query;

    try{
         if(decoded){

           if(device){
            const posts=await PostModel.find({userId:decoded.userId});
            res.status(200).send({posts})
           }
         }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRoutes.post("/add",async(req,res)=>{
    try{
        const post=new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":'Post has been added'})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRoutes.patch("/update/:postId",async(req,res)=>{
     const token=req.headers.authorization;
     const payload=req.body;
    const {postId}=req.params;
    const decoded=jwt.verify(token,"masai");
    const userId=decoded.userId;
    const post =await PostModel.findOne({_id:postId})
    const userIdInPost=post.userId
    console.log(payload,postId,userId,userIdInPost);

    try{
        if(userId===userIdInPost){
            await PostModel.findByIdAndUpdate({_id:postId},payload)
            res.status(200).send({"msg":"Notes has been updated"})
        }else{
            res.status(400).send({"msg":"User not authorized"})
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRoutes.delete("/delete/:postId",async(req,res)=>{
    const token=req.headers.authorization;
  
   const {postId}=req.params;
   const decoded=jwt.verify(token,"masai");
   const userId=decoded.userId;
   const post =await PostModel.findOne({_id:postId})
   const userIdInPost=post.userId

   try{
       if(userId===userIdInPost){
           await PostModel.findByIdAndDelete({_id:postId})
           res.status(200).send({"msg":"Notes has been deleted"})
       }else{
           res.status(400).send({"msg":"User not authorized"})
       }
   }catch(err){
       res.status(400).send({"err":err.message})
   }
})







module.exports={postRoutes}