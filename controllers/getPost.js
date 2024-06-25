const postModel=require('../models/postSchema')
exports.getPost=async(req,res)=>{
    try{
        const posts=await postModel.find({}).populate('userId').populate({
            path: 'commentsArray',
            populate: { path: 'userId' }}).exec();
        res.status(200).json({
            posts,
            success:true,
            message:'Posts fetched successfully!!',
        })
    }
    catch(err){
        console.log("Error in getting the posts",err)
        res.status(400).json({
            success:false,
            message:'Error in getting the posts'
        })
    }
}