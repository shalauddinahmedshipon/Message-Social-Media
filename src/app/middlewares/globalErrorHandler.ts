import { ErrorRequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler:ErrorRequestHandler=(err,req,res,next)=>{
const statusCode = err.status||500;
const message=err.message||'something went wrong!';
res.status(statusCode).json(
  {
    success: false,
    message,
    statusCode,
    error: err,
    stack:err?.stack
  }
)
}

export default globalErrorHandler;