const { createProject, editProject, deleteProject, getProject, getAllProjectByUser
} = require("../services/project.service");

exports.createProjectController = (req, res) => {
    createProject(req).then(data => {
        res.status(200).json({
            project: data,
            message: "Project created successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.deleteProjectController = (req, res) => {
    deleteProject(req).then(data => {
        res.status(200).json({
            project: data,
            message: "Project deleted successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.editProjectController = (req, res) => {
    editProject(req).then(data => {
        res.status(200).json({
            project: data,
            message: "Project edited successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}
exports.getProjectController = (req, res) => {
    getProject(req).then(data => {
        res.status(200).json({
            project: data,
            message: "Fetched Project successfully."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}

exports.getAllProjectByUserController = (req, res) => {
    getAllProjectByUser(req).then(data => {
        res.status(200).json({
            project: data,
            message: "List of All the Project."
        });
    }).catch(err =>{
        res.status(400).json({error: err});
    })
}