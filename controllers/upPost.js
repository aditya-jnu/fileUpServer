const postModel = require('../models/postSchema');
const userModel = require('../models/userSchema');
const cloudinary = require('cloudinary').v2;

const supportedTypes = ["jpg", "jpeg", "png"];
const options = {
    folder: 'codeAsset',
    resource_type: 'auto'
};

function isFileSupported(supportedTypes, imgType) {
    return supportedTypes.includes(imgType);
}

async function uploadToCloud(img, options) {
    try {
        return await cloudinary.uploader.upload(img.tempFilePath, options);
    } catch (error) {
        console.log("Error uploading to Cloudinary", error);
        throw new Error("Cloudinary upload failed");
    }
}

exports.upPost = async (req, res) => {
    try {
        const { userId, caption } = req.body;
        const img = req.files ? req.files.imgFile : null;
        let fileUrl = null;

        if (img) {
            // VALIDATION
            const imgType = img.name.split('.').pop().toLowerCase();
            console.log("Type of image", imgType);
            if (!isFileSupported(supportedTypes, imgType)) {
                return res.status(400).json({
                    success: 'false',
                    message: 'Image format not supported'
                });
            }

            // UPLOAD TO CLOUDINARY
            const response = await uploadToCloud(img, options);
            console.log("Image uploaded to Cloudinary", response);
            fileUrl = response.secure_url;
        }

        // CREATE POST ENTRY IN DB
        const creationTime = new Date().toLocaleString();
        const postData = await postModel.create({
            userId,
            fileUrl,
            caption,
            timestamp:creationTime
        });

        res.json({
            success: 'true',
            message: 'Your post is created',
            postData: postData
        });

        // UPDATE USER WITH NEW POST
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            $push: { postsArray: postData._id }
        }, { new: true }).populate('postsArray').populate('commentsArray').exec();
        console.log("Updated user", updatedUser);
    } catch (err) {
        console.log("Error in uploading post", err);
        res.status(400).json({
            success: false,
            message: "Error in uploading post"
        });
    }
};
