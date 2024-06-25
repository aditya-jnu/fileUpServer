const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    fileUrl:{
        type:String
    },
    caption:{
        type:String,
        required:true
    },
    timestamp:{
        type:String,
        required:true
    },
    commentsArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"commentModel"
    }]
})

module.exports=mongoose.model("postModel",postSchema)