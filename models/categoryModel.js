const { type } = require('express/lib/response')
const mongoose = require('mongoose')

//schema
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category title is required']
    },
    imageurl:{
        type:String,
        default:"https://www.pinterest.com/pin/good-food-logo-design-on-transparent-background-png-in-2023--854135885600295501/"
    }
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema);