const projectModel = require('../models/projects');

// CRUD operations for projects
// Create a new project
exports.createProject = async (req, res) => {
    const project = new projectModel({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
}
// Update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);

        if(project == null){
            return res.status(404).json({message: 'Project not found'})
        }

        if(req.body.name != null){
            project.name = req.body.name
        }
        if(req.body.description != null){
            project.description = req.body.description
        }
        if(req.body.startDate != null){
            project.startDate = req.body.startDate
        }
        if(req.body.endDate != null){
            project.endDate = req.body.endDate
        }

        const updatedProject = await project.save();
        res.json(updatedProject)
    }
    catch (err){
        res.status(400).json({message: err.message})
    }
}
// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);

        if(project == null){
            return res.status(404).json({message: 'Project not found'})
        }

        await projectModel.findByIdAndDelete(req.params.id);
        res.json({message: 'Project deleted'})
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}
// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.json(projects)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
};
// Get a project by id
exports.getProjectById = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);

        if(project == null){
            return res.status(404).json({message: 'Project not found'})
        }

        res.json(project)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
};