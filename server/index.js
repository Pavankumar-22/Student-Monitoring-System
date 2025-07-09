// const express = require('express');
const dotenv = require('dotenv');//understand the difference betwen const and import es6 
dotenv.config();
const connectDB = require('./config/db');
const app = require('./app');
const PORT = 5000;
// const app = express();

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server runs on at http://localhost:${PORT}`)
});
});