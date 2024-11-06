const express = require('express')
const connectDB = require('./config')
require('dotenv').config(); 
const app = express()
const PORT = process.env.PORT || 5000;



app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`); 
    connectDB()
})