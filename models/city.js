var mongoose = require('mongoose')
const citySchema =new mongoose.Schema
({  //to define a shape and content of the doc
    name : {
        type : String,
        required: true
    },
    country : {
        type : String,
        required: true
    },
})

module.exports = mongoose.model("city", citySchema)