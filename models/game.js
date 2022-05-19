var mongoose = require('mongoose')
const schema  =new mongoose.Schema
({  //to define a shape and content of the doc
    name : {
        type : String,
        required: true
    },
    describtion : {
        type: String,
        required: true,
    },
    type : {type:String},
    stores: {type:String}
})
module.exports = mongoose.model('gamedb', schema)



