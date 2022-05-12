var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var appointmentSchema = new Schema({
    appointmentid:{
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    Doctorname: {
        type: String,
        require: true
    },
    date:{
        type:String,
    },
    status:{
        type:String,
    }

})
module.exports = mongoose.model('Appointment', appointmentSchema)