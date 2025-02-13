const { type } = require('express/lib/response')
const mongoose = require('mongoose')

//schema
const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Food title is required']
    },
    description: {
        type: String,
        required: [true, 'Food description is required']
    },
    foodTags: {
        type: String
    },
    category: {
        type: String
    },
    code: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Food price is required']
    },
    imageurl: {
        type: String,
        default: "https://www.google.com/imgres?q=fast%20food&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F964%2F198%2Fnon_2x%2Ffast-food-meal-set-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Ffast-food&docid=O1kmM7fqkm857M&tbnid=vFPYZMMxzeZr4M&vet=12ahUKEwjprNbzpoeKAxWnzTgGHbMkDHsQM3oECFQQAA..i&w=980&h=980&hcb=2&ved=2ahUKEwjprNbzpoeKAxWnzTgGHbMkDHsQM3oECFQQAA"
    }
}, { timestamps: true })

module.exports = mongoose.model('Food', FoodSchema);