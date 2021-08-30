const ProjectModel = require('../models/project.model');
const HttpException = require('../utils/HttpException.urils');


class ProjectController {
    getAllProjects = async (req, res, next) => {
        let projectList = await ProjectModel.find()

        if (!projectList) {
            throw new HttpException(404, 'Projects not found')
        }

        res.send(projectList);
    }

    getProjectById = async (req, res, next) => {
        const project = await ProjectModel.findOne({ id: req.params.id });

        if (!project) {
            throw new HttpException(404, 'Project not found')
        }

        res.send(project)
    }

    getProjectByName = async (req, res, next) => {
        const project = await ProjectModel.findOne({ project_name: req.params.project_name });

        if (!project) {
            throw new HttpException(404, "Project not found")
        }

        res.send(project)
    }

    createProject = async (req, res, next) => {
        const result = await ProjectModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong try again later please')
        }
        res.status(201).send('Project was created')
    }

    updateProject = async (req, res, next) => {
        const { project_id, ...otherOptions } = req.body
        
        const result = await ProjectModel.update(otherOptions, req.params.id);

        if (!result) {
            throw new HttpException(404, "something went wrong please try again later")
        }

        const { affectedrows, changedRows, info } = result;

        const message = !message ? 'User not found' : affectedrows && changedRows ? "Project updated successfully" : "Update fail";

        res.send({message, info})
    }

    deleteProject = async (req, res, next) => {
        const result = await ProjectModel.delete(req.params.id);

        if (!result) {
            throw new HttpException(404, "Project not found")
        }

        res.send('Project has being deleted')
    }
}

module.exports = new ProjectController;