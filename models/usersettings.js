var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    country:{
        type: String,
    }

})


module.exports = mongoose.model('UserSettings', userSchema)