const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createCategoryController, getCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController')


const router = express.Router()

//ROUTER

//CREATE CATEGORY
router.post('/create', authMiddleware,createCategoryController)

//GET ALL CATEGORY
router.get('/getAll',getCategoryController)

//UPDATE CATEGORY
router.put('/update/:id', authMiddleware,updateCategoryController)

//DELETE CATEGORY
router.delete('/delete/:id',authMiddleware,deleteCategoryController)

module.exports =router