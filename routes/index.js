const express=require('express');
const router=express.Router();
const registerModel=require('../models/register.js');

router.get('/',(req,res)=>{
   res.render('login.ejs')
});

router.post('/login',(req,res)=>{
     const body=req.body;
     
});

router.get('/register',(req,res)=>{
    res.render('register.ejs')
});

router.post('/register',(req,res)=>{
    
})

module.exports=router;