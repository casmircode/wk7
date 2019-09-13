let mongoose = require('mongoose');


let developerSchema = mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required:true
        },
        lastName: String,
    },
    level: {
        type: String,
        required: true,
        uppercase: true
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: Number
    },
});


let developerModel = mongoose.model('developerCol', developerSchema);
module.exports = developerModel;