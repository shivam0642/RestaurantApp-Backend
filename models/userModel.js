const { type } = require('express/lib/response')
const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name ois required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'] },
    address:{
        type:Array,
    } ,  
    phone:{
        type:String,
        required:[true,'Phone number is required'],
    },
    userType:{
        type:String,
        required:[true,'User type is required'],
        default:'client',
        enum:['client','admin','vendor','driver'],
    } ,
    profile:{
        type:String,
        default:'https://uxwing.com/corporate-user-icon/'
    },
    answer:{
        type:String,
        required:[true,"Answer is required"],
    },

},{timestamps:true})

module.exports = mongoose.model('User',userSchema);