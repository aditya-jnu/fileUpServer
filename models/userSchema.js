const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type:String,
        required:true
    },
    postsArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postModel"
    }],
    commentsArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"commentModel"
    }]
})

module.exports=mongoose.model("userModel",userSchema)