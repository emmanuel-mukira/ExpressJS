import express from "express";
import routes from "./routes/index.mjs";

const app=express();

app.use(express.json());
app.use(routes);

const PORT=process.env.PORT || 3000 ;

app.listen(PORT,()=>console.log(`Running express server on port ${PORT}!`));

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










