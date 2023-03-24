const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        researcher: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref: 'User',
        },
        projectName: {
            type: String,
            required: [true, 'Please add project name'],
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        organization: {
            type: String,
            required: false
        },
        status: {
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
