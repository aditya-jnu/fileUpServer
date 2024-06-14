const mongoose=require('mongoose')
require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DB connection successfull!!")
    }).catch((error)=>{
        console.log(error);
        console.log("Error in DB connection.")
    })
}

module.exports=dbConnect;