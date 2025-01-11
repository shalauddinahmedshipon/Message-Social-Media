/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";


const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{
let statusCode = err.statusCode||400;
let message=err.message||'something went wrong!';



let errorSources:TErrorSources=[
  {
    path:"",
    message:"something went wrong"
  },
]




if(err instanceof ZodError){
const simplifiedError=handleZodError(err)
 statusCode=simplifiedError?.statusCode;
 message=simplifiedError?.message;
 errorSources=simplifiedError?.errorSources;
  
}else if(err?.name ==="ValidationError"){
const simplifiedError=handleValidationError(err)
 statusCode=simplifiedError?.statusCode;
 message=simplifiedError?.message;
 errorSources=simplifiedError?.errorSources;
}



res.status(statusCode).json(
  {
    success: false,
    message,
    statusCode,
    error:{
      errorSources
    },
    err,
    stack:err?.stack
  }
)
}

export default globalErrorHandler;