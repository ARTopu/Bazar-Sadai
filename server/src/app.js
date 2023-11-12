const express = require ("express");
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require("./routers/userRouter");
const { seedUser } = require("./controllers/seedController");
const { errorResponse } = require("./controllers/responseController");

const rateLimiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max : 5,
    message : "Too many request. Please try again later.",

})

const app = express();

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/users",userRouter);
app.use("/api/seed",seedUser);



app.get('/test', (req , res)=>{
    res.status(200).send({
        Message: "API is working fine",
        Name: "Topu",
    });
});


//client error handling
app.use((req,res,next)=>{
    next(createError(404,"Route not found"));
});

//server error handling
app.use((err,req,res,next)=>{
   
    return errorResponse(res,{statusCode:err.status, message:err.message});
});

module.exports = app;