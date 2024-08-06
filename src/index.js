const express=require('express');

const app=express();
//gives an instance of an express application

//we need to actually listen to a port so that we can 
//listen to requests coming in
const PORT=3001;
//call listen method on the app with the port and callback function for some
//logging
app.listen(PORT,()=>console.log(`Running express server on port ${PORT}!`));

//Call get method on app takes 2 parameters
//1st one is the path its is mandatory
//
app.get('')