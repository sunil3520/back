const jwt=require("jsonwebtoken");


const auth=(req,res,next)=>{
    const token=req.headers.authorization
    // console.log(token);
    if(token){
       const decoded=jwt.verify(token,'masai');
    //    console.log(decoded);
       if(decoded){
        req.body.userId=decoded.userId;
        next()

       } else{
        res.status(400).send({"msg":"Please Login first"})
       }
    }else{
        res.status(400).send({"msg":"Please Login first"})
    }
}

module.exports={auth}