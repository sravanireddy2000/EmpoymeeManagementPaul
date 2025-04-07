const express=require('express');
const router=express.Router();
const registerModel=require('../models/register.js');
const employeeModel=require('../models/employee.js');
const { login,
        loginPageRender, 
        homePageRender,
        registerPageRender, 
        register,
        fetchEmployees, 
        getEmployees} = require('../controller/index.js');

router.get('/',login);
router.post('/login',loginPageRender);

router.get('/homepage',homePageRender);
 
router.get('/register',registerPageRender)
      .post('/register',register);


router.get('/fetchemployees',fetchEmployees);

router.post('/addemployee',getEmployees);

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