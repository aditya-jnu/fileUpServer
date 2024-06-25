const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const userModel = require('../models/userSchema');

// Sign-Up Controller
exports.signUp = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userExist = await userModel.findOne({ userName });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'this userName already exist'
      });
    }

    let hashedPass;
    try {
      hashedPass = await bcrypt.hash(password, 10);
    } catch (err) {
      console.error('Error in hashing the password', err);
      return res.status(500).json({
        success: false,
        message: 'error in processing your request'
      });
    }

    const creationTime = new Date().toLocaleString();
    const userData = await userModel.create({
      userName,
      password: hashedPass,
      timestamp: creationTime
    });
    console.log('New user saved in DB', userData);

    return res.status(201).json({
      success: true,
      message: 'user created successfully!',
      user: userData
    });
  } catch (err) {
    console.error('Error in sign-up process', err);
    return res.status(500).json({
      success: false,
      message: 'internal server error, please try again later.'
    });
  }
};

// Sign-In Controller
exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log('User input:', userName, password);

    const userExist = await userModel.findOne({ userName })
      .populate('postsArray')
      .populate('commentsArray')
      .exec();

    if (!userExist) {
      console.log('user does not exist, please signUp.');
      return res.status(400).json({
        success: false,
        message: 'user does not exist, please signUp.'
      });
    }
     console.log('user found in DB', userExist);

    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
        return res.status(200).json({
        success: true,
        message: 'user loggedIn successfully.',
        user: userExist
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'incorrect passWord, please try again.'
      });
    }
  } catch (err) {
    console.error('Error in sign-in process', err);
    return res.status(500).json({
      success: false,
      message: 'internal server error, please try again later.'
    });
  }
};
