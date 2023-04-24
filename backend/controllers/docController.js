const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Doc = require('../models/docModel');

// @desc    get project docs
// @route   GET /api/docs
// @access  private

const getDocs = asyncHandler(async (req, res) => {// Get docs using the project_id in the params
    
    console.log(req.params.id)
    const project= await Project.findById(req.params.id);
console.log(project)
    if (!project) {
        res.status(404)
        throw new Error('Project not found.')
    }

    // if (project._id.toString() !== req.user.id) {
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }

    const docs = await Doc.find({ project_id: req.params.id });

    res.status(200).json(docs);
});

// @desc    create new doc
// @route   POST /api/docs
// @access  private

const createDoc = asyncHandler(async (req, res) => {
    const { docTitle, project_id,docDescription, docLocation, docLastSeen } = req.body;

    // validate project exists

    const project = await Project.findById(project_id);



    if (!docTitle || !docDescription) {
        res.status(400);
        throw new Error('Please add a title and description');
    }

    // const user = await User.findById(req.user.id);

    // if (!user) {
    //     res.status(401);
    //     throw new Error('User not found');
    // }

    const doc = await Doc.create({
        docTitle,
        docDescription,
        project_id: project._id, 
        docLocation,
        docLastSeen
    });
    res.status(201).json(doc);
});


module.exports = { getDocs, createDoc };
