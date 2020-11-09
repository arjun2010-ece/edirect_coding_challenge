const { createTask, editTask, deleteTask, getTask, getAllTaskInProject, editTaskStatus
} = require("../services/task.service");

exports.createTaskController = (req, res) => {
    createTask(req).then(data => {
        res.status(200).json({
            task: data,
            message: "Task created successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.editTaskController = (req, res) => {
    editTask(req).then(data => {
        res.status(200).json({
            task: data,
            message: "Task edited successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.deleteTaskController = (req, res) => {
    deleteTask(req).then(data => {
        res.status(200).json({
            task: data,
            message: "Task deleted successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.getTaskController = (req, res) => {
    getTask(req).then(data => {
        res.status(200).json({
            task: data,
            message: "Fetch  a single Task successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.getAllTaskInProjectController = (req, res) => {
    getAllTaskInProject(req).then(data => {
        res.status(200).json({
            tasks: data,
            message: "Fetch List of tasks successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.editTaskStatusController = (req, res) => {
    editTaskStatus(req).then(data => {
        res.status(200).json({
            tasks: data,
            message: "Updated status of tasks successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}