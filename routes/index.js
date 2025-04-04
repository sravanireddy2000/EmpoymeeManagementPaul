const express=require('express');
const router=express.Router();
const registerModel=require('../models/register.js');

router.get('/',(req,res)=>{
   res.render('login.ejs')
});
router.get('/homepage',(req,res)=>{
    res.render('index.ejs')
 });
 
router.post('/login',async (req,res)=>{
     const body=req.body;
     try{
      const update=await registerModel.findOne({email:body.email})
 
      if(!update)
          return res.status(400).json({success:false,message:'Unable to find User'});
     
      if(body.password!==update.password)   
        return res.status(400).json({success:false,message:'Password not match'});

      return res.status(200).json({success:true,message:'User identified'});
     }
     catch(err)
     {   
       return res.status(500).json({success:false,message:'Network error'});
     }
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
   {   
     return res.status(500).json({success:false,message:'Network error'});
   }
})
router.post('/addemployee',async (req,res)=>{
  const body=req.body;
  console.log(body);
//  try{
//   const update=await registerModel.create({name:body.name,email:body.email,password:body.password})
//   if(!update)
//       return res.status(400).json({success:false,message:'Unable to register'});
//   return res.status(201).json({success:true,message:'Registered successfully'})
//  }
//  catch(err)
//  {   
//    return res.status(500).json({success:false,message:'Network error'});
//  }
})

module.exports=router;