// const express = require('express');
const dotenv = require('dotenv');//understand the difference betwen const and import es6 
dotenv.config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT;
// const app = express();

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`Server runs on at http://localhost:${PORT}`)
});
});
