// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";
// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!", err);
})












/*
import express from "express"

const app=express()

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening in port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.log("ERROR :",error)
        throw err
    }
})()*/