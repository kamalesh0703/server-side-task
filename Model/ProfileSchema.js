const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProfileSchema=new Schema({
    Email:{
        type:String,
    },
    Password:{
        type:String,
    },
    ProfileFor:{
        type:String,
    },
    Name:{
        type:String,
    },
    Gender:{
        type:String,
    },
    DOB:{
        type:String,
    },
    Religon:{
        type:String,
    },  
    MotherTongue:{
        type:String,
    },
    Living:{
        type:String,
    },
    Mobile :{
        type:Number,
    }, 
},{timestamps:true})
module.exports=mongoose.model('profiles',ProfileSchema) 