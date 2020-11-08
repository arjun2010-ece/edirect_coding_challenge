var express = require('express');
var router = express.Router();

const {createTaskController, editTaskController, deleteTaskController, 
    getTaskController, getAllTaskInProjectController
} = require("../controllers/task.controller");

const {requireSignin} = require("../middleware");


router.post("/create/task",  requireSignin, createTaskController);
router.delete("/delete/task/:taskId",  requireSignin, deleteTaskController);
router.put("/update/task/:taskId",  requireSignin, editTaskController);
router.get("/fetch/task/:taskId",  requireSignin, getTaskController);
router.get("/fetch/tasks/:projectId",  requireSignin, getAllTaskInProjectController);


module.exports = router;
