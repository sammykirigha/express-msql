const express = require('express');
const router = express.Router();
const taskController = require('../conrollers/task.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');

router.get('/', awaitHandlerFactory(taskController.getAllTasks));
router.get('/id/:id', awaitHandlerFactory(taskController.getTaskById));
router.get('/task_name/:task_name', awaitHandlerFactory(taskController.getTaskBytaskName));
router.post('/', awaitHandlerFactory(taskController.createTask));
router.delete('/id/:id', awaitHandlerFactory(taskController.deleteTask));


module.exports = router