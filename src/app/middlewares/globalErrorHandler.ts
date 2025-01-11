/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import handleZodError from "../error/handleZodError";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";
import AppError from "../error/AppError";
import { error } from "console";


const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{
let statusCode =500;
let message='something went wrong!';



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
  
}
else if(err?.name ==="ValidationError"){
const simplifiedError=handleValidationError(err)
 statusCode=simplifiedError?.statusCode;
 message=simplifiedError?.message;
 errorSources=simplifiedError?.errorSources;
}
else if(err?.name ==="CastError"){
const simplifiedError=handleCastError(err)
 statusCode=simplifiedError?.statusCode;
 message=simplifiedError?.message;
 errorSources=simplifiedError?.errorSources;
}
else if(err?.code ===11000){
const simplifiedError=handleDuplicateError(err)
 statusCode=simplifiedError?.statusCode;
 message=simplifiedError?.message;
 errorSources=simplifiedError?.errorSources;
}
else if(err instanceof AppError){
 statusCode=err?.statusCode;
 message=err?.message;
 errorSources=[
  {
    path:'',
    message:err?.message
  }
 ]
}
else if(err instanceof Error){
 message=err?.message;
 errorSources=[
  {
    path:'',
    message:err?.message
  }
 ]
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