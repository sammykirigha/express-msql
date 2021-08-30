const express = require('express');
const projectController = require('../conrollers/project.controller');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory')


router.get('/', awaitHandlerFactory(projectController.getAllProjects)); 
router.get('/id/:id', awaitHandlerFactory(projectController.getProjectById));
router.get('/project_name/:project_name', awaitHandlerFactory(projectController.getProjectByName));
router.post('/', awaitHandlerFactory(projectController.createProject));
router.patch('/id/:id', awaitHandlerFactory(projectController.updateProject));
router.delete('/id/:id', awaitHandlerFactory(projectController.deleteUser));

module.exports = router;