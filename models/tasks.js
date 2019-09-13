let mongoose = require('mongoose');


let taskSchema = mongoose.Schema({
    taskName: String,
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'developerCol'
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
    taskStatus: String,
    taskDesc: String
});


let taskModel = mongoose.model('taskCol', taskSchema);
module.exports = taskModel;