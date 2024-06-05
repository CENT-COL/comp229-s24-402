const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const authMiddleware = require('../middlewares/auth');

// REST API for projects
// GET all projects
router.get('/', authMiddleware, projectController.getAllProjects);
// GET a project by id
router.get('/:id', authMiddleware, projectController.getProjectById);
// POST a new project
router.post('/', authMiddleware, projectController.createProject);
// PUT a project
router.put('/:id', authMiddleware, projectController.updateProject);
// DELETE a project
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;