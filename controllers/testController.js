const testUserController = (req,resp) => {
    try{
        resp.status(200).send('<h1> Test User data</h1>')
    }
    catch(error){
         console.log('error is Test API',error);
        resp.status(500).send({
            success:false,
            message:'Error in test api',
            error
        }) 
    }
};

module.exports = {testUserController};