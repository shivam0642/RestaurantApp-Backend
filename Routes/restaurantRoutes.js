const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantController')


const router = express.Router()

//Routes

//CREATE RESTAURENT ||POST
router.post('/create',authMiddleware,createRestaurantController)

//GET ALL RESTAURANTS
router.get('/getAll',getAllRestaurantController)

//GET RESTAURANTS BY ID || GET
router.get('/get/:id',getRestaurantByIdController)

//DELETE RESTAURANT || DELETE
router.delete('/delete/:id',authMiddleware,deleteRestaurantController)
module.exports =router