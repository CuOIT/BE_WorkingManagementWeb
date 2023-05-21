const express =require("express");
// or 
// let express = require('express')

let viewEngineConfiguration = (app) => {
    // config public to render bla bla
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); // ejs = jsp
    // ejs uses HTML as base
    app.set("views", "./src/views");
    //client renders in views 
}

module.exports = viewEngineConfiguration;