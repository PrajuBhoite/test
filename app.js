const express = require("express")
const app = express();
const logger =require ("morgan") ;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const PORT=4001;
const apiRoute= require("./routes/apis/index");

app.use(logger("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/firstProject")
.then(res => console.log(`Mongoose connected to db successfully ${res}`))
.catch(err => console.log(`Mongoose connection to db failed ${err.message}`));

app.use("/api", apiRoute);


app.listen(PORT,()=>{
    console.log("server is connected");
    
})