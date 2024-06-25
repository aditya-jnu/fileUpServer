const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"postModel"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    timestamp:{
        type:String
    }
})

module.exports=mongoose.model("commentModel",commentSchema)