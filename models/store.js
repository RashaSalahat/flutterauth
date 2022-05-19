var mongoose = require('mongoose')
const storeSchema =new mongoose.Schema(
    {
        name:{type:String,required:true,trim:true},
        city:{type:String,required:true,trim:true},
        country:{type:String,required:true,trim:true},
        starttime:{type:String,required:true,trim:true},
        endtime:{type:String,required:true,trim:true},
        describtion: String
    }
)
module.exports = mongoose.model("store",storeSchema)
