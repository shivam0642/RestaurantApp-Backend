const JWT = require('jsonwebtoken')


    module.exports = async (req, resp, next) => {
        try {
            // Get token from header
            const authHeader = req.headers["Authorization"];
            if (!authHeader) {
                return resp.status(401).send({
                    success: false,
                    message: "Authorization header is missing",
                });
            }
    
            const token = authHeader.split(" ")[1];
            if (!token) {
                return resp.status(401).send({
                    success: false,
                    message: "Token is missing",
                });
            }
    
            // Verify token
            JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) {
                    return resp.status(401).send({
                        success: false,
                        message: "Unauthorized: Invalid Token",
                    });
                } else {
                    req.body.id = decode.id; // Set user id in request body
                    next();
                }
            });
        } catch (error) {
            resp.status(500).send({
                success: false,
                message: "An error occurred while processing the token",
                error: error.message,
            });
        }
    };
    