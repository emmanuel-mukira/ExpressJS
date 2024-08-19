import { testUsers } from "./constants.mjs";
export const resolveIndexUserById=(request,response,next)=>{
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