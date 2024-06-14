const upModel=require('../models/upschema.js');
const cloudinary=require('cloudinary');

const supportedType=["jpg","jpeg","png","mp4","mov"];
const options={
    folder:'codeAsset',
    resource_type:'auto'
}
function isFileSupported(supportedType, fileType){
    return supportedType.includes(fileType)
}
async function upToCloud(userFile,options){
    try{
        return await cloudinary.uploader.upload(userFile.tempFilePath,options)
    }
    catch(error){
        console.log(error)
    }
}



exports.getPosts=async (req,res)=>{
    try{
        const posts=await upModel.find({});
        res.status(200).json({
            success:true,
            message:'Data fetched successfully!!',
            data:posts
        })

    }catch(err){
        console.log(err)
        return res.json({
            success:'false',
            message:'Error in fetching data.'
        })
    }
}

exports.upFile=async(req,res)=>{
    try{

        // FETCH DATA
        const{desc,email}=req.body;
        console.log(desc,email);
        const userFile=req.files.fileToUp; //this line fetches file named fileToUp from req.files and store it in constant named as userFile
        console.log(userFile);

        //VALIDATION
        const fileType=userFile.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if(!isFileSupported(supportedType,fileType)){
            return res.status(400).json({
                success:'false',
                message:'File format not supported'
            })
        }

        //UPLOAD TO CLOUDINARY
        const response=await upToCloud(userFile,options);
        console.log("upToCloud ",response);

        // DB ME ENTRY CREATE KARO
            const fileData = await upModel.create({
            desc,
            email,
            fileUrl:response.secure_url,
        })

        res.json({
            success:'true',
            message:'Image uploaded successfully',
            imgURL:response.secure_url
        })
    
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:'Something error'
        })
    }
}