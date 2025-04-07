const login=async (req,res)=>{
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
}


const loginPageRender=(req,res)=>{
    res.render('login.ejs')
 };
const homePageRender=(req,res)=>{
    res.render('index.ejs')
 };

const registerPageRender=(req,res)=>{
    res.render('register.ejs')
}

const register=async (req,res)=>{
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
}
 module.exports={login,loginPageRender,homePageRender,registerPageRender,register};