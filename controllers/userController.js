const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')

//GET USER INFO
const getUserController =async (req,resp)=>{
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }

        //hide password
        user.password = undefined;
        //resp
        resp.status(200).send({
            success:true,
            message:'User get successfully',
            user
        })
    }
     catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'error in Get user api',
            error
        })
        
    }
}

const updateUserController =async (req,resp)=>{
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:'User Not found',
            })
        }
        //update
        const {userName,address,phone} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone

         //save user
         await user.save()
         resp.status(200).send({
            success:true,
            message:'User Updated Successfully'
         })
    } catch (error) {
        resp.status(500).send({
            success:false,
            message:'Error in UpdateUser API',
            error
        })
    }
}

//RESET PASSWORD
const resetPasswordController = async (req,resp) =>{
    try {
        const {email,newPassword,answer} = req.body
        if(!email || !newPassword ||!answer)
        {
            return resp.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user)
        {
           return resp.send(500).send({
            success:false,
            message:'User not found or invalid answer'
           }) 
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashsedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashsedPassword
        await user.save();
        resp.status(200).send({
            success:true,
            message:'password reset successfully'
        })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'error in password reset api'
        })
    }
}

//UPDATE PASSWORD
const updatePasswordController = async (req,resp)=>{
    try {
        //find user
        const user = await userModel.findById({_id:req.body.id})
        if(!user)
        {
            return resp.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword)
        {
            return resp.status(500).send({
                success:false,
                message:'Please Provide old or new password'
            })
        }
      //check user password | compare password
      const isMatch = await bcrypt.compare(oldPassword,user.password)
      if(!isMatch){
        resp.send(500).send({
            success:false,
            message:'Invalid Old password'
        })
      }

      user.password = newPassword;
       //hashing password
       var salt = bcrypt.genSaltSync(10);
       const hashsedPassword = await bcrypt.hash(newPassword,salt);
       user.password = hashsedPassword
       
       await user.save()
       resp.status(200).send({
          success:true,
          message:'Password Updated'
       })
    } catch (error) {
        console.log(error);
        resp.status(500).send({
            success:false,
            message:'Error in Update Password API',
            error
        })
    }
}

//DELETE PROFILE ACCOUNT
const deleteProfileController = async (req,resp) =>{
   try {
      await userModel.findByIdAndDelete(req.params.id)
      return resp.status(200).send({
        success:true,
        message:'Your account has been deleted',
      })
   } catch (error) {
      console.log(error);
      resp.status(500).send({
        success:false,
        message:'Error in Delete Profile API',
        error
      })
   }
}

module.exports = {getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}