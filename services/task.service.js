const db = require("../models/index");
const task = require("../models/task");
const taskModal = task(db.sequelize, db.Sequelize.DataTypes);

const project = require("../models/project");
const projectModal = project(db.sequelize, db.Sequelize.DataTypes);

taskModal.associate({Project: projectModal});

// create
// edit
// delete
// getSingletask by taskId
// getALltask by a user

exports.createTask = async (req) => {
    const task = await taskModal.create(req.body);
    return task;
}

exports.editTask = async (req) => {
    const task = await taskModal.update(req.body, {where: {id: req.params.taskId}});
    // console.log("Task:: ", task);
    return req.params.taskId;
}
exports.deleteTask = async (req) => {
    await taskModal.destroy({where: {id: req.params.taskId}});
    return req.params.taskId;
}

exports.getTask = async (req) => {
    const task = await taskModal.findOne({where: {id: req.params.taskId}});
    return task;
}

exports.getAllTaskInProject = async (req) => {
    const tasks = await taskModal.findAll({where: {project: req.params.projectId}});
    return tasks;
}
// exports.readAdmissionForm = async (req) => {
//     const updatedForm = await admission_formModal.findOne( {where: {id: req.params.admission_id}});
//     return updatedForm;
// }
