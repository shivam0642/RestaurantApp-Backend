const express = require('express');
const cors = require('cors');
const morgan = require('morgan') //middleware,provides detailed logs of incomming requests,helps to find any issue
const dotenv = require('dotenv');  //environmental variable
const connectDb = require('./config/db');

//dot env configuration
dotenv.config();
//if .env is in other folder then we have to provide path
//dotenv.config({path:'./foldername'})

//DB connection
connectDb();


const app = express();


//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))

//route
app.use('/api/v1/test',require('./Routes/testRoutes'))
app.use('/api/v1/auth',require('./Routes/authRoutes'))
app.use('/api/v1/user',require("./Routes/userRoutes"))
app.use('/api/v1/restaurant',require('./Routes/restaurantRoutes'))
app.use('/api/v1/category',require('./Routes/categoryRoutes'))
app.use('/api/v1/food',require('./Routes/foodRoutes'))

app.get('/',(req,resp) =>{
    return resp.status(200).send("<h1> Welcome</h1>")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server Running on ${PORT}`);
});
 