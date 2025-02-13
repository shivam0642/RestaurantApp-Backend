const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken') 

const registerController = async (req,resp)=>{
    try {
        const {userName,email,password,phone,address,answer} = req.body 
        //validation
        if(!userName || !email || !password || !address || !phone ||!answer)
        {
            return resp.status(500).send({
                success:false,
                message:'Please provide all field'
            })
        }  
        
        //check existing user
        const existing = await userModel.findOne({email})
        if(existing){
            return resp.status(500).send({
                success:false,
                message:'Email already exists',
            })
        }
        //Hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashsedPassword = await bcrypt.hash(password,salt);
        //create new user
        const user = await userModel.create({userName,email,password:hashsedPassword,address,phone,answer})
        resp.status(201).send({
            success:true,
            message:'Successfully Registered',
            user
        })
    } catch (error) {
      console.log(error);
      resp.status(500).send({
        success:false,
        message:'Error in register API',error
      })
        
    }
};


//LOGIN
const loginController = async (req,resp) => {
   try {
      const {email,password} = req.body
      if(!email || !password){
        return resp.status(500).send({
            success:false,
            message:'Please provide email and password'
        })
      }
      //check user
      const user = await userModel.findOne({email})
      if(!user){
        return resp.status(404).send({
            success:false,
            message:'User Not found'
        })
      }

      //check user password | compare password
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        resp.status(500).send({
            success:false,
            message:'Password does not match'
        })
      }
      // token
      const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'7d'
      });

      user.password = undefined; //the password field will not show 
      resp.status(200).send({
        success:true,
        message:'Login Successful',
        token,
        user
      })
   } catch (error) {
      console.log(error);
      resp.status(500).send({
        success:false,
        message:'Error in Login API',
        error
      })
      
   }
}




module.exports = {registerController,loginController};