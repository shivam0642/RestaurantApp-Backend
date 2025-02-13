const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');


    module.exports = async (req, resp, next) => {
        try {
           const User = await userModel.findById(req.body.id)
           if(User.userType != "admin")
           {
              return resp.status(500).send({
                success:false,
                message: "You are not authorized for access"
              })
           }
           else
           next();
        } catch (error) {
            resp.status(500).send({
                success: false,
                message: "UnAuthorized access",
                error: error.message,
            });
        }
    };
    