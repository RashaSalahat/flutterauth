var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var healthSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    Mon: {
        type: Number,
    },
    Tue: {
        type:  Number,
    },
    Wed: {
        type:  Number,
       
    },
    Thur: {
        type:   Number,
       
    },
    Fri:{
        type:   Number,
    },
    Sat:{
        type:   Number,
    },
    Sun:{
        type:  Number,
    },

})

module.exports = mongoose.model('HealthWorkout1', healthSchema)