const express = require ("express");
require("dotenv").config()
const mongoose = require ("mongoose");
const {connect} = mongoose;
const URI = process.env.MONGOURI



exports.connectToDB = () => {
    connect(URI,() => {
                console.log("Connected to Passport Database")
                },
            (err) => { 
                console.log(err.message) 

                }

)};

