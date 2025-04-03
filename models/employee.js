const mongoose=require('mongoose');

const schema=mongoose.Schema({
    'firstname':{
        type:String,
        required:true
    },
    'lastname':{
        type:String,
        required:true
    },
    'email':{
        type:String,
        required:true
    },
    'salary':{
        type:String,
        required:true
    },
    'date':{
        type:Date,
        default:Date.now()
    },
});

const employeeModel=mongoose.model('employee_collection',schema);

module.exports=employeeModel;