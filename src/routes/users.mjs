import {Router} from "express";
//function to create a router instance 
import {validationResult,body,matchedData,checkSchema} from "express-validator";
import { createUserValidationSchema, getUsersValidationSchema } from "../utils/validationSchemas.mjs";
import {testUsers} from "../utils/constants.mjs";
import { resolveIndexUserById } from "../utils/middleware.mjs";
const router = Router();


//GET 
router.get("/api/users",checkSchema(getUsersValidationSchema),(request,response)=>{
  //call validationResult function on the request object 
  //to extract validation errors which you can handle yourself
  const result = validationResult(request);
  //validation for : 
  //localhost:3000/api/users?filter=username&value=sally
  if(!result.isEmpty()){
    return response.status(400).send({errors:result.array()});
  }

  const{query:{filter,value}}=request;


  if(filter && value){
   return response.send(testUsers.filter((user)=>user[filter].includes(value)))
  }

  return response.send(testUsers);
})

//GET user by id
router.get("/api/users/:id",resolveIndexUserById,(request,response)=>{
  const {findUserIndex}=request;
  const findUser=testUsers[findUserIndex];
  if(!findUser){
    return response.sendStatus(404);
  } else{
    return response.send(findUser);
  }

})

//POST
router.post( "/api/users",checkSchema(createUserValidationSchema),(request,response)=>{
  const result=validationResult(request);
  //if result is not empty
  if(!result.isEmpty()){
    return response.status(400).send({errors: result.array()});
  }

  //matchedData function retrieves the data that has been validated
  //and that is what is used to add to the 'database'
  const data=matchedData(request);
  console.log(data);

  const newUser={id:testUsers[testUsers.length-1].id+1,...data};
  testUsers.push(newUser);
  response.status(201).send(testUsers);
})

//PUT
router.put("/api/users/:id",resolveIndexUserById,(request,response)=>{
  //now we can destructure findUserIndex from request object as we attached it
  const{body,findUserIndex}=request;
  
  testUsers[findUserIndex]= { id: testUsers[findUserIndex].id,...body};
  return response.sendStatus(200);
})

//PATCH
router.patch("/api/users/:id",resolveIndexUserById,(request,response)=>{
  const{body,findUserIndex}=request;
 
  testUsers[findUserIndex]={...testUsers[findUserIndex], ...body};
  return response.sendStatus(200);
})

//DELETE
router.delete("/api/users/:id",resolveIndexUserById,(request,response)=>{
  const{findUserIndex}=request;
  testUsers.splice(findUserIndex,1);
  return response.sendStatus(200);  
})

export default router;