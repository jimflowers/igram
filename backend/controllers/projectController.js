const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Project = require('../models/projectModel');

// @desc    get user projects
// @route   GET /api/projects
// @access  private

const getProjects = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const projects = await Project.find({ user: req.user.id });

    res.status(200).json(projects);
});

// @desc    get user project
// @route   GET /api/projects/:id
// @access  private
// limited to researcher's projects

const getProject = asyncHandler(async (req, res) => {
    // Get project using the id in the params
    
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404)
        throw new Error('Project not found.')
    }

    if (project.investigator_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // const project = await Project.findbyID({ user: req.user.id });

    res.status(200).json(project);
});

// @desc    create new project
// @route   POST /api/projects
// @access  private

const createProject = asyncHandler(async (req, res) => {
    const { projectName, projectDescription, investigator_id } = req.body;

    if (!projectName || !projectDescription) {
        res.status(400);
        throw new Error('Please add a title and description');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const project = await Project.create({
        projectName,
        projectDescription,
        investigator_id: req.user.id,
    });
    res.status(201).json(project);
});

// @desc    delete project
// @route   DELETE /api/projects/:id
// @access  private
// limited to researcher's projects

const deleteProject = asyncHandler(async (req, res) => {
    // Get project using the id in the params
    
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404)
        throw new Error('Project not found.')
    }

    if (project.researcher.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // const project = await Project.findbyID({ user: req.user.id });

    await project.remove()

    res.status(200).json({success: true});
});

// @desc    UPDATE project
// @route   PUT /api/projects/:id
// @access  private
// limited to researcher's projects

const updateProject = asyncHandler(async (req, res) => {
    // Get project using the id in the params
    
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404)
        throw new Error('Project not found.')
    }

    if (project.researcher.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

   const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
// the option object {new: true} allows one to add data that is not there

    res.status(200).json(updatedProject);
});


module.exports = { getProjects, getProject, deleteProject, updateProject, createProject };
