const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        investigator_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref: 'User',
        },
        projectName: {
            type: String,
            required: [true, 'Please add project title'],
            unique: true,
        },
        projectDescription: {
            type: String,
            required: [true, 'Please add a description'],
        },
        projectOrganization: {
            type: String,
            required: false
        },
        projectStatus: {
            type: String,
            required: [true],
            enum: ['open', 'closed', 'archived'],
            default: 'open'
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Project', projectSchema);
