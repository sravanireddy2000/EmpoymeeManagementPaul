document.querySelector('.addemployeebtn').addEventListener('click',()=>{
    const employeesection= document.querySelector('.employeesection');
    employeesection.style.display = "block";
    isEdit=false;
    HandleForms();
 })
 document.querySelector('.close').addEventListener('click',()=>{
    const employeesection= document.querySelector('.employeesection');
    document.getElementById('form').reset();
    employeesection.style.display = "none";
 })

 let isEdit=false;

 function HandleForms(id){
     console.log('edit',isEdit);
     if(isEdit===false)
      {
     document.getElementById('form').onsubmit=async(e)=>{
     e.preventDefault();
    const form=new FormData(e.target);
    const obj=Object.fromEntries(form.entries());
    console.log('obj',obj);
    try{
     const response=await fetch('/addemployee',{headers:{'Content-Type':'application/json'},method:'POST',
     body:JSON.stringify(obj)})
         if(response.ok)
     {
         const data=await response.json();
         document.getElementById('form').reset();
         alert(data.message);
       
         document.querySelector('.employeesection').style.display="none";
         window.location.reload();
         return;
     }
     const error=await response.json()
     alert(error.message);
    }
    catch(error)
    {
      console.log(error);
    }
   }
 }
 else
 {
     document.getElementById('form').onsubmit=async(e)=>{
     e.preventDefault();
    const form=new FormData(e.target);
    const obj=Object.fromEntries(form.entries());
    try{
     const response=await fetch(`/updateemployee?id=${id}`,{headers:{'Content-Type':'application/json'},method:'PUT',
     body:JSON.stringify(obj)})
         if(response.ok)
     {
         const data=await response.json();
         document.getElementById('form').reset();
         alert(data.message);
         document.querySelector('.employeesection').style.display="none";
         window.location.reload();
         return;
     }
     const error=await response.json()
     alert(error.message);
    }
    catch(error)
    {
      console.log(error);
    }
   }
  }
 }

 let employees={};
 const fetchEmployees=async ()=>{
     try{
     const response=await fetch('/fetchemployees')
         if(response.ok)
     {
         const data=await response.json();

         console.log(data);

        employees=data?.data;
        if(employees)
          {
            SetEmployees();
          }
      
     
         return;
     }
     const error=await response.json()
     alert(error.message);
    }
    catch(error)
    {
      console.log(error);
    }
 }

 function SetEmployees(){
  console.log('employees',employees);
  const tbody= document.querySelector('.tablebody');
  tbody.innerHTML='';
  employees.map((e,index)=>{
  const tr= document.createElement('tr');
  const id= document.createElement('th');
  const fname= document.createElement('td');
  const lname= document.createElement('td');
  const email= document.createElement('td');
  const salary= document.createElement('td');
  const date= document.createElement('td');
  const actions= document.createElement('td');
  const edit= document.createElement('button');
  const deleteBtn= document.createElement('button');

  id.innerText=index+1;

  fname.innerText=e.firstname;
  lname.innerText=e.lastname;
  email.innerText=e.email;
  salary.innerText=e.salary;
  date.innerText=e.date;

  edit.classList.add('edit');
  deleteBtn.classList.add('delete');
  edit.innerText="Edit";
  edit.onclick=(value)=>{
      value.preventDefault();
      isEdit=true;
      document.querySelector('.employeesection').style.display = "block";
      console.log(isEdit,'edit');
      HandleForms(e._id);
     };
  deleteBtn.innerText="Delete";
  deleteBtn.onclick=(value)=>{
     value.preventDefault();
     DeleteEmployee(e._id);
    };
  actions.append(edit,deleteBtn)
  tr.append(id,fname,lname,email,salary,date,actions)
  tbody.append(tr);
})
 }

 const firstNameClick=document.getElementById('firstname');
 const lastName=document.getElementById('lastname');
 const email=document.getElementById('email');
 const salary=document.getElementById('salary');
 const date=document.getElementById('date');


 firstNameClick.onclick=(e)=>{
  employees.sort((a, b) => a.firstname.localeCompare(b.firstname));
  SetEmployees();
 }
 lastName.onclick=(e)=>{
  employees.sort((a, b) => a.lastname.localeCompare(b.lastname));
  SetEmployees();
 }
 email.onclick=(e)=>{
  employees.sort((a, b) => a.email.localeCompare(b.email));
  SetEmployees();
 }
 salary.onclick=(e)=>{
  employees.sort((a, b) => {
    let avalue=parseInt(a.salary) || 0;
    let bValue=parseInt(b.salary) || 0;
    return bValue-avalue;
  });
  SetEmployees();
 }
 const DeleteEmployee=async (id)=>{
    try{
        const response=await fetch(`/deleteemployee`,{headers:{'Content-Type':'application/json'},method:'DELETE',
        body:JSON.stringify({id})})
            if(response.ok)
        {
            const data=await response.json();
            alert(data.message);
            window.location.reload();
            return;
        }
        const error=await response.json()
        alert(error.message);
       }
       catch(error)
       {
         console.log(error);
       }
 }

function SearchFunctionality(){
      const search=document.getElementById('search');
      const searchBtn=document.getElementById('searchbtn');
      
      searchBtn.onclick=async (e)=>{
        let value=search.value;
      
        try{
           const response=await fetch(`/search/${value}`);
           const data=await response.json();
           if(data.success)
           {
            const tbody= document.querySelector('.tablebody');
            tbody.innerHTML="";
            data?.data?.map((e,index)=>{
             const tr= document.createElement('tr');
             const id= document.createElement('th');
             const fname= document.createElement('td');
             const lname= document.createElement('td');
             const email= document.createElement('td');
             const salary= document.createElement('td');
             const date= document.createElement('td');
             const actions= document.createElement('td');
             const edit= document.createElement('button');
             const deleteBtn= document.createElement('button');
    
             id.innerText=index+1;
             fname.innerText=e.firstname;
             lname.innerText=e.lastname;
             email.innerText=e.email;
             salary.innerText=e.salary;
             date.innerText=e.date;
    
             edit.classList.add('edit');
             deleteBtn.classList.add('delete');
             edit.innerText="Edit";
             edit.onclick=(value)=>{
                 value.preventDefault();
                 isEdit=true;
                 document.querySelector('.employeesection').style.display = "block";
                 console.log(isEdit,'edit');
                 HandleForms(e._id);
                };
             deleteBtn.innerText="Delete";
             deleteBtn.onclick=(value)=>{
                value.preventDefault();
                DeleteEmployee(e._id);
               };
             actions.append(edit,deleteBtn)
             tr.append(id,fname,lname,email,salary,date,actions)
             tbody.append(tr);
            })

            return;
           }
          
        
           console.log(data.message);
        }
        catch(error)
        {
            console.log(error);
        }
      }
}
 fetchEmployees();
 SearchFunctionality();
 