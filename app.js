const express=require('express');
const dotenv=require('dotenv').config({path:'./.env.development'});
const app=express();
const database=require('./config/database.js');

database();


app.listen('2000',()=>console.log(`Server running on port ${process.env.PORT}`))
