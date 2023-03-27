const express=require("express");
const {connection}=require("./db")
const {UserRoutes}=require("./routes/user.routes");
const {postRoutes}=require("./routes/post.routes");
const {auth}=require("./middlewares/auth.middlewares")
const cors=require("cors")
require('dotenv').config()

const app=express();
app.use(cors())

app.use(express.json());
app.use("/users",UserRoutes);

app.use(auth)
app.use("/posts",postRoutes);










app.listen(process.env.PORT,async()=>{
    try{
         await {connection}
         console.log("Mongo is connected");
    }catch(err){
        console.log("mongo is not connected please check once");
    }
    console.log(`Server is running on port ${process.env.PORT}`);
})