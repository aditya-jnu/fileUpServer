const mongoose =require('mongoose');

const upschema=new mongoose.Schema({
        desc:{
            type:String,
            required:true
        },
        email:{
            type:String,
        },
        fileUrl:{
            type:String,
        }
    });

module.exports=mongoose.model("upModel",upschema);