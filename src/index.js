const express=require('express');

const app=express();
//gives an instance of an express application

//we need to actually listen to a port so that we can 
//listen to requests coming in
const PORT=3001;
//call listen method on the app with the port and callback function for some
//logging
app.listen(PORT,()=>console.log(`Running express server on port ${PORT}!`));

//GET REQUEST
//Call get method on app takes 2 parameters
//1st one is the path its is mandatory
//2nd one is a callback function taking two arguments 
//first is the request object , second is response object
//request gives all information about client making request stuff like cookies,headers ...
//response is responsible for handling sending responses to clients
app.get('/groceries',(request,response)=>{
    //sending body back to client
    response.send([
     {
       item: 'milk',
       quantity: 2,
     },
     {
       item: 'bread',
       quantity:6,
     },
     {
       item: 'cookies',
       quantity:7,
     }
    ])
});

