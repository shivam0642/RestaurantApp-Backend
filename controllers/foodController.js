const foodModel = require("../models/foodModel");
const orderMOdel = require("../models/orderMOdel");

//CREATE FOOD CONTROLLER
const createFoodController = async (req, resp) => {
    try {
        const { title, description, foodTags, category, code, isAvailable, restaurant, rating, ratingCount, price, imageurl } = req.body
        if (!title || !description || !price || !restaurant) {
            resp.status(500).send({
                success: false,
                message: "Please provide all the fields"
            })
        }
        const newFood = new foodModel({ title, description, foodTags, category, code, isAvailable, restaurant, rating, ratingCount, price, imageurl })
        await newFood.save()
        resp.status(201).send({
            success: true,
            message: "New Food Added Successfully",
            newFood
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error In create food api",
            error
        })
    }
}

//GET ALL FOOD CONTROLLER
const getAllFoodController = async (req, resp) => {
    try {
        const foods = await foodModel.find({})
        if (!foods) {
            return resp.status(404).send({
                success: false,
                message: "No Food Item was found"
            })
        }

        resp.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error In get all food api",
            error: error.message
        })
    }
}

//GET SINGLE FOOD CONTROLLER
const getSingleFoodController = async (req, resp) => {
    try {
        const foodId = req.params.id
        if (!foodId) {
            return resp.status(404).send({
                success: false,
                message: "please provide food id"
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return resp.status(404).send({
                success: false,
                message: 'Food not found'
            })
        }

        resp.status(200).send({
            success: true,
            food
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message: "Error In get single food api",
            error: error.message
        })
    }
}

//GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, resp) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return resp.status(404).send({
                success: false,
                message: "please provide food id"
            })
        }
        const food = await foodModel.find({ restaurant: restaurantId })
        if (!food) {
            return resp.status(404).send({
                success: false,
                message: 'Food not found'
            })
        }

        resp.status(200).send({
            success: true,
            message: "Food based on restaurant",
            food
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message: "Error In get single food api",
            error: error.message
        })
    }
}

const updateFoodController = async (req, resp) => {
    try {
        const foodId = req.params.id;
        if(!foodId)
        {
            return resp.status(404).send({
                success: false,
                message:"Please provide food id"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food)
        {
            return resp.status(404).send({
                success: false,
                message: 'Food not found'
            })
        }

        const {title,description,price,imageurl,foodTags,category,code,isAvailable,restaurant,rating} = req.body
        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{
            title,description,price,imageurl,foodTags,category,code,isAvailable,restaurant,rating
        },{new:true})
        resp.status(200).send({
            success:true,
            message:"Food updated successfully",
            updatedFood
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).send({
            success: false,
            message: "Error In update food api",
            error:error.message
        })
    }
}

const deleteFoodController = async (req, resp) => {
    try {
        const foodId = req.params.id;
        if(!foodId)
        {
            return resp.status(404).send({
                success: false,
                message:"Please provide food id"
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food)
        {
            return resp.status(404).send({
                success: false,
                message:"Food not found with this id"
            })
        }

        await foodModel.findByIdAndDelete(foodId)
        resp.status(200).send({
            success:true,
            message:"Food item deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message:"Error in delete food api",
            error:error.message
        })
    }
}

//PLACE ORDER CONTROLLER
const placeOrderController = async (req,resp) =>{
    try {
        const {cart,payment} = req.body
        if(!cart)
        {
            return resp.status(500).send({
                success:false,
                message:"Please provide food cart and payment details"
            })
        }
        let total = 0;
        //calculate 
        cart.map((i) =>{
             total += i.price
            })
            
        const newOrder =  new orderMOdel({
            food:cart,
            payment:total,
            buyer:req.body.id
        }) 
        await newOrder.save()
        resp.status(201).send({
            success:true,
            message:"Order placed successfully",
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message:'Error in place order api',
            error:error.message
        })
    }
}

//ORDER STATUS
//CAON ONLY UPDATED BY ADMIN
const orderStatusController = async (req,resp) =>{
    try {
        const orderId = req.params.id
        if(orderId)
        {
            return resp.status(404).send({
                success:false,
                message:"Order not found"
            })
        }
        const {status} = req.body
        const order = await orderMOdel.findByIdAndUpdate(orderId,{status},{new:true})
        resp.status(200).send({
            success:true,
            message:"Order status updated successfully",
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).send({
            success: false,
            message:'Error in order status api',
            error:error.message
        })
    }
}

module.exports = { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController,deleteFoodController,placeOrderController,orderStatusController };