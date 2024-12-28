const userModel = require('../models/userSchema');

exports.getUser = async (req, res) => {
    try{
            const { userId } = req.params; // Get userId from request params
  
            // Fetch the user details including posts and comments (populate the necessary fields)
            const user = await userModel.findById(userId)
            .populate('postsArray')
            .populate('commentsArray');
  
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                user,
            });
    }catch(err){
            console.error('Error fetching user data:', err);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
    }
}