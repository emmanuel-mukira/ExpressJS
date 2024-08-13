
import express from "express";

import {query} from "express-validator";
//import query middleware function to validate query parameters

const app=express();
//gives an instance of an express application

//Returns middleware that only parses json and 
//only looks at requests where the Content-Type header matches the type option.
app.use(express.json());


const loggingMiddleware=(request,response,next)=>{
  console.log(`${request.method} - ${request.url}`);
  next();
}


app.use(loggingMiddleware,(request,response,next)=>{
  console.log("Finished logging");
  next();
})

const resolveIndexUserById=(request,response,next)=>{
  const{params:{id},}=request;
  const parsedId=parseInt(id);
  if(isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex=testUsers.findIndex((user)=>user.id===parsedId);
  if(findUserIndex === -1) return response.sendStatus(404);

  //Attaching all request.findUserIndex to all 
  //succeding middlewares assuming we dont delete findUserIndex
  //they will have access to findUserIndex property which is a numeric value
  request.findUserIndex=findUserIndex;
  next();
  //next() can take an error object as an argument  next(new Error());

}



//we need to actually listen to a port so that we can 
//listen to requests coming in
const PORT=process.env.PORT || 3000 ;
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
const testUsers=[
  {id:1, username:"john", age:40},
  {id:2, username:"lucy", age:54},
  {id:3, username:"paul", age:64},
  {id:4, username:"sarah", age:24},
  {id:5, username:"jane", age:34},
  {id:6, username:"mike", age:44},
  {id:7, username:"lisa", age:54},
  {id:8, username:"sally", age:64},
  {id:9, username:"jill", age:24},
  {id:10, username:"matt", age:34},
];
//pass it as argument in specific route
app.get('/api/',
    //two middleware functions
    (request,response,next)=>{
     console.log("Base URL 1");
     next();
     //make sure to call next function so that the next middleware down
     //the chain can be called
    }
  ,(request ,response)=>{
  response.status(200).send({msg:'Hello world'});
});

app.get('/api/groceries',(request,response)=>{
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


// Route Parameters
// Dynamically get specific value using route parameters
// request.params returns the parameters in the request body
// parseInt changes the String id sent in the json request to an integer
app.get("/api/users/:id",resolveIndexUserById,(request,response)=>{
  const {findUserIndex}=request;
  const findUser=testUsers[findUserIndex];
  if(!findUser){
    return response.sendStatus(404);
  } else{
    return response.send(findUser);
  }

});

//Query Parameters
// lets say we want to return the testUsers sorted based
// on something like age from smallest to greatest
// we would use query parameters for that


app.get("/api/users",(request,response)=>{
  console.log(request.query);
  //destructuring the query parameters
  const{query:{filter,value}}=request;

  //when filter and value are defined you can now filter
  //use the filter method on the array of objects
  //it takes a callback function or predicate function
  //which check if the filter key has a value that includes
  //parameter passed in the value part .includes() only works for strings
  if(filter && value) return response.send(
    testUsers.filter((user)=>user[filter].includes(value))
  );
  return response.send(testUsers);
})
//the console.log returns : { filter: 'paul' }
//for this query parameter : http://localhost:3000/api/users?filter=paul
//the key is filter , the value is paul

//http://localhost:3000/api/users?filter=username&value=l
//We can pass a key of the user object as the value for the filter key
//and pass another key value pair of value with what you want 
//console.log output: { filter: 'username', value: 'l' }

//POST request
app.post("/api/users",(request,response)=>{
  //Destructuring the request body

  const {body}=request;
  //Auto add +1 to id for last user in testUser array 
  //Then use spread operator to take all fields from body object and unpack it
  //into new object being created and add newUser to testUsers
  const newUser={id:testUsers[testUsers.length-1].id+1,...body};
  testUsers.push(newUser);
  response.status(201).send(testUsers);
})

//PUT request
app.put("/api/users/:id",resolveIndexUserById,(request,response)=>{
  //now we can destructure findUserIndex from request object as we attached it
  const{body,findUserIndex}=request;
  
  testUsers[findUserIndex]= { id: testUsers[findUserIndex].id,...body};
  return response.sendStatus(200);
  
});

//PATCH requests
app.patch("/api/users/:id",resolveIndexUserById,(request,response)=>{
  const{body,findUserIndex}=request;
 
  testUsers[findUserIndex]={...testUsers[findUserIndex], ...body};
  return response.sendStatus(200);
})

//Delete requests
app.delete("/api/users/:id",(request,response)=>{
  const{findUserIndex}=request;
  
  testUsers.splice(findUserIndex,1);
  return response.sendStatus(200);  
})



