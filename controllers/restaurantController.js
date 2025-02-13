//CREATE RESTAURANT

const restaurantModel = require("../models/restaurantModel")

const createRestaurantController = async (req, resp) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body
        //validation
        if (!title || coords) {
            return resp.status(500).send({
                success: false,
                message: "please provide title and address"
            })
        }
        const newRestaurant = new restaurantModel({ title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords })
        await newRestaurant.save()

        resp.status(201).send({
            success: true,
            message: "New Restaurant created successfully",
        });
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in Create Rstaurant API",
            error:error.message
        })
    }
}

//GET ALL RESTAURANT
const getAllRestaurantController = async (req,resp) => {
     try {
        const restaurants = await restaurantModel.find({})
        if(!restaurants)
        {
            return resp.status(404).send({
                success: false,
                message: "No Restaurant found"
            })
        }

        resp.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
     } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in Get All Restaurant API",
            error:error.message
        })
     }
}

const getRestaurantByIdController = async (req,resp) => {
    try {
       const restaurantId = req.params.id
    
       if(!restaurantId){
        return resp.status(404).send({
            success: false,
            message: "Restaurant ID is required"
        })
       }
       //find restaurant
       const restaurant = await restaurantModel.findById(restaurantId)
       if(!restaurant)
       {
        return resp.status(404).send({
            success: false,
            message: "Restaurant not found",
        })
       }

       resp.status(200).send({
          succes:true,
          restaurant
       })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Get Restaurant by ID API",
            error:error.message
        })
        
    }
}

//DELETE RESTAURANT 
const deleteRestaurantController = async (req,resp) => {
    try {
         const restaurantId = req.params.id;
         if(!restaurantId)
         {
            return resp.status(404).send({
                success: false,
                message: "Restaurant ID is required"
            })
         }

       await restaurantModel.findByIdAndDelete(restaurantId)
       resp.status(200).send({
        success:true,
        message:"Restuarant deleted successfully"
       })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success: false,
            message: "Error in Delete Restaurant API",
        })
        
    }
}

module.exports = { createRestaurantController, getAllRestaurantController, getRestaurantByIdController,deleteRestaurantController};