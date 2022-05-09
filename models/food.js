var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var foodSchema = new Schema({
    foodname:{type:String, required:true },
    time:{type:String },
    calories:{type:String },
    duration:{type:String },
    description:{type:String },
    foodImage: { type: String }
})



module.exports = mongoose.model("food", foodSchema)