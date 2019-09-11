let mongoose = require('mongoose');

let carSchema = mongoose.Schema({
    maker: String,
    year: Number,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'UserCol'
    }
});

let carModel = mongoose.model('CarsCollection', carSchema);
module.exports = carModel;