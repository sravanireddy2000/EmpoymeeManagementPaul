const express=require('express');
const router=express.Router();

const { login,
        loginPageRender, 
        homePageRender,
        registerPageRender, 
        register,
        fetchEmployees, 
        getEmployees,
        updateEmployee,
        deleteEmployee,
        searchFunctionality} = require('../controller/index.js');

router.get('/',loginPageRender);

router.post('/login',login);

router.get('/homepage',homePageRender);
 
router.get('/register',registerPageRender)
      .post('/register',register);


router.get('/fetchemployees',fetchEmployees);

router.post('/addemployee',getEmployees);

router.put('/updateemployee',updateEmployee)

router.delete('/deleteemployee',deleteEmployee)



router.get('/search/:id',searchFunctionality);

module.exports=router;