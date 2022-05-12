var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var healthSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    Height: {
        type: String,
       
    },
    Mass: {
        type: String,
       
    },
})



module.exports = mongoose.model('HealthMass1', healthSchema)