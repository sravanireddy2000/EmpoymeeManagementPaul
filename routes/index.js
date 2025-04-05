const express=require('express');
const router=express.Router();
const registerModel=require('../models/register.js');
const employeeModel=require('../models/employee.js');

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

router.get('/fetchemployees',async (req,res)=>{
  try{
    const update=await employeeModel.find({});

    if(!update || update.length===0)
        return res.status(400).json({success:false,message:'list is empty'});

    return res.status(201).json({success:true,message:'Fetched employees successfully',data:update})
  }
  catch(err)
  {   
    return res.status(500).json({success:false,message:'Network error'});
  }
});

router.post('/addemployee',async (req,res)=>{
  const body=req.body;
  
  if(!body.fname || !body.lname || !body.email || !body.salary ||  !body.date )
    return res.status(400).json({success:false,message:'Complete all the fields'});
  try{
    const update=await employeeModel.create({
      firstname:body.fname,
      lastname:body.lname,
      email:body.email,
      salary:body.salary,
      date:body.date
    });

    if(!update)
        return res.status(400).json({success:false,message:'Unable to Add'});
    return res.status(201).json({success:true,message:'Employee Added successfully'})
  }
  catch(err)
  {   
    return res.status(500).json({success:false,message:'Network error'});
  }
})

router.put('/updateemployee',async (req,res)=>{
  const body=req.body;
  const {id}=req.query;
  console.log(id);
  if(!body.fname || !body.lname || !body.email || !body.salary ||  !body.date )
    return res.status(400).json({success:false,message:'Complete all the fields'});
  try{
    const exist=await employeeModel.findOne({_id:id});
    if(!exist)
      return res.status(400).json({success:false,message:'User does not exist!'});

      exist.firstname=body.fname,
      exist.lastname=body.lname,
      exist.email=body.email,
      exist.salary=body.salary,
      exist.date=body.date
      
      await exist.save();

    return res.status(201).json({success:true,message:'Employee Updated successfully'})
  }
  catch(err)
  {   
    return res.status(500).json({success:false,message:'Network error'});
  }
})

router.delete('/deleteemployee',async (req,res)=>{
  const {id}=req.body;
  console.log('d',id)
  if(!id )
    return res.status(400).json({success:false,message:'Id required!'});

  try{
    const exist=await employeeModel.findOne({_id:id});
    if(!exist)
      return res.status(400).json({success:false,message:'User does not exist!'});

      await exist.deleteOne()
    return res.status(201).json({success:true,message:'Employee Delete successfully'})
  }
  catch(err)
  {   
    return res.status(500).json({success:false,message:'Network error'});
  }
})

module.exports=router;