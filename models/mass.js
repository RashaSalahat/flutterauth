var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var healthSchema = new Schema({
    userid:{
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    Age: {
        type: String,
    },
    AgeType: {
        type: String,
    },
    Height: {
        type: String,
       
    },
    Mass: {
        type: String,
       
    },
})



module.exports = mongoose.model('HealthMass1', healthSchema)