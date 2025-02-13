const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getAllFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController } = require('../controllers/foodController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const orderMOdel = require('../models/orderMOdel')

const router = express.Router()

//ROUTES

//CREATE FOOD ROUTE
router.post('/create',authMiddleware,createFoodController)

//GET ALL FOOD
router.get('/getAll',getAllFoodController) 

//GET SINGLE FOOD
router.get('/get/:id',getSingleFoodController)

//GET FOOD BY RESTAURANT
router.get('/getByRestaurant/:id',getFoodByRestaurantController)

//UPDATE FOOD ROUTE
router.put('/update/:id',authMiddleware,updateFoodController)

//DELETE FOOD ROUTE
router.delete('/delete/:id',authMiddleware,deleteFoodController)

//PLACE ORDER
router.post('/placeOrder',authMiddleware,placeOrderController)

//ORDER STATUS
router.post('/orderStatus/:id',authMiddleware,adminMiddleware,orderStatusController)
module.exports =router