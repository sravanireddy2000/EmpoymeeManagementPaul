const express=require('express');
const dotenv=require('dotenv').config({path:'./.env.development'});
const app=express();



app.listen('2000',()=>console.log(`Server running on port ${process.env.PORT}`))
