var express = require('express');
var router = express.Router();

const {createProjectController, deleteProjectController, editProjectController, 
getProjectController, getAllProjectByUserController
} = require("../controllers/project.controller");

const {requireSignin, userById,  authMiddleware} = require("../middleware");

router.param("userId", userById);

router.post("/create/project/:userId", requireSignin, authMiddleware, createProjectController);
router.delete("/delete/project/:projectId/:userId", requireSignin, authMiddleware, deleteProjectController);
router.put("/update/project/:projectId/:userId",  requireSignin, authMiddleware, editProjectController);
router.get("/fetch/project/:projectId", requireSignin,  getProjectController);
router.get("/fetch/projects/:userId",  requireSignin, getAllProjectByUserController);


module.exports = router;
