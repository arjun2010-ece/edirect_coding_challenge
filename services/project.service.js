const db = require("../models/index");
const project = require("../models/project");
const projectModal = project(db.sequelize, db.Sequelize.DataTypes);

// const user = require("../models/user");
// const userModal = user(db.sequelize, db.Sequelize.DataTypes);

// const task = require("../models/task");
// const taskModal = task(db.sequelize, db.Sequelize.DataTypes);

// projectModal.associate({Task: taskModal});
// projectModal.associate({User: userModal});

// create
// edit
// delete
// getSingleProject by ProjectId
// getALlProject by a user

exports.createProject = async (req) => {
    const {name, user} = req.body;
    const project = await projectModal.create({name, user});
    return project;
}

exports.editProject = async (req) => {
    const project = await projectModal.update(req.body, {where: {id: req.params.projectId}});
    console.log("Project:: ", project);
    return req.params.projectId;
}
exports.deleteProject = async (req) => {
    await projectModal.destroy({where: {id: req.params.projectId}});
    return req.params.projectId;
}

exports.getProject = async (req) => {
    const project = await projectModal.findOne({where: {id: req.params.projectId}});
    return project;
}

exports.getAllProjectByUser = async (req) => {
    const project = await projectModal.findAll({where: {user: req.params.userId}});
    return project;
}
// exports.readAdmissionForm = async (req) => {
//     const updatedForm = await admission_formModal.findOne( {where: {id: req.params.admission_id}});
//     return updatedForm;
// }
