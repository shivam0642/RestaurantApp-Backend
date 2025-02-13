const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()

//Routes
//GET USER || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE PROFILE
router.put('/updateUser',authMiddleware,updateUserController)

//RESET PASSWORD
router.post('/resetPassword',authMiddleware,resetPasswordController);

//password update
router.post('/updatePassword',authMiddleware,updatePasswordController)

//DELETE USER
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)
module.exports =router