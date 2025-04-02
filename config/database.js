const mongoose=require('mongoose');

const database=async ()=>{
    try{
         const db=await mongoose.connect(process.env.MONGO_URI);
         console.log('Database connected');
    }
    catch(error)
    {
           console.log('error occured',error);
    }
}

module.exports=database;