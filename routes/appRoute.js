const express=require('express')
const router=express.Router();

// import controller
const{signUp,signIn}=require('../controllers/upUser')
const {getPost}=require('../controllers/getPost')
const {upPost}=require('../controllers/upPost')
const {upComment}=require('../controllers/upComment')

// mapping
router.post("/signin",signIn)
router.post("/signup",signUp)
router.get("/posts",getPost)
router.post("/upload/post",upPost)
router.post("/upload/comment",upComment)

module.exports=router;