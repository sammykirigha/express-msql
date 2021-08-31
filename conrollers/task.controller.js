const TaskModel = require('../models/task.model');
const HttpException = require('../utils/HttpException.urils');

class TaskController {
    getAllTasks = async (req, res, next) => {
        let taskList = await TaskModel.find();

        if (!taskList) {
            throw new HttpException(404, "Task not found")
        }

        res.send(taskList);
    }

    getTaskById = async (req, res, next) => {
        const task = await TaskModel.findOne({ task_id: req.params.task_id });

        if (!task) {
            throw new HttpException(404, "Task not found")
        }

        res.send(task)
    }

    getTaskBytaskName = async (req, res, next) => {
        const task = await TaskModel.findOne({ task_name: req.params.task_name });

        if (!task) {
            throw new HttpException(404, 'User not found')
        }

        res.send(task);
    }

    createTask = async (req, res, next) => {
        const result = await TaskModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong try again later')
        }

        res.status(201).send('Task was created')
    }

    updateTask = async (req, res, next) => {
        const result = await TaskModel.update(req.params.task_id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong')
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Task not found' : affectedRows && changedRows ? 'Task updated successfully' : 'update faild';
        
        res.send({message, info})
    }

    deleteTask = async (req, res, next) => {
        const result = await TaskModel.delete(req.params.task_id);

        if (!result) {
            throw new HttpException(404, 'Task not found')
        }

        res.send('Task has being deleted')
    }
}

module.exports = new TaskController;