const express=require('express');
const dotenv=require('dotenv').config({path:'./.env.development'});
const app=express();
const database=require('./config/database.js');
const path = require('path');

database();

app.use(express.static(path.join(__dirname,'static')));

app.listen('2000',()=>console.log(`Server running on port ${process.env.PORT}`))
