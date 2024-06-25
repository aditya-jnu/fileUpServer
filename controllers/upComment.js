const commentModel=require('../models/commentSchema');
const userModel=require('../models/userSchema');
const postModel=require('../models/postSchema')

exports.upComment=async(req,res)=>{
    try{
        const{comment,postId,userId}=req.body;
        const creationTime=new Date().toLocaleString();
        const commentData=await commentModel.create({
            postId,
            userId,
            comment,
            timestamp: creationTime
        })
        console.log("This new comment data is now stored in DB",commentData)
        res.json({
            success:"true",
            message:'Comment posted!!',
            commentData:commentData
        })

        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { commentsArray: commentData._id }
        }, { new: true }).populate('postsArray').populate('commentsArray').exec();
        console.log("This is updated user",updatedUser)

        const updatedPost = await postModel.findByIdAndUpdate(postId, {
            $push: { commentsArray: commentData._id }
        }, { new: true }).populate('commentsArray').exec();
        console.log("This is updated post",updatedPost)
    }
    catch(err){
        console.log("Error in posting a comment",err)
        res.status(400).json({
            success:false,
            message:"Error in posting a comment"
        })
    }
}