const mongoose = require('mongoose');

const docSchema = mongoose.Schema(
    {
        project_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'project'
        },
        docTitle: {
            type: String,
            required: [true, 'Please add document name'],
            unique: true,
        },
        docDescription: {
            type: String,
            required: [true, 'Please add a description'],
        },
        docLocation: {
            type: String,
        },
        docLastSeen: {
            type: Date,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Doc', docSchema);