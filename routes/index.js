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

router.post('/register',async (req,res)=>{
    const body=req.body;
   try{
    const update=await registerModel.create({name:body.name,email:body.email,password:body.password})
    if(!update)
        return res.status(400).json({success:false,message:'Unable to register'});
    return res.status(201).json({success:true,message:'Registered successfully'})
   }
   catch(err)
   {    return res.status(500).json({success:false,message:'Network error'});

   }
 
})

module.exports=router;