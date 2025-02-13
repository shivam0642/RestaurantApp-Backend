const { type } = require('express/lib/response')
const mongoose = require('mongoose')

//schema
const ordersSchema = new mongoose.Schema({
    food:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:'Food'}
    ],
    payment:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['preparing','prepare','on the way','delivered'],
        default:'preparing'
    }
}, { timestamps: true })

module.exports = mongoose.model('Orders', ordersSchema);