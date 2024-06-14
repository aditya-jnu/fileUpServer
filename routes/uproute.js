const express=require('express')
const router=express.Router();

// import all controllers
const{upFile, getPosts}=require('../controllers/uplogic.js')

// mapping
router.get("/posts",getPosts);
router.post("/file",upFile);

module.exports=router;