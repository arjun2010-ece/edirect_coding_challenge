var express = require('express');

const authRouter = require("./auth");
const projectRouter = require("./project");
const taskRouter = require("./task");

let registerApp = function(app){
    app.use("/api/auth", authRouter);
    app.use("/api", projectRouter);
    app.use("/api", taskRouter);
}

module.exports = registerApp;
