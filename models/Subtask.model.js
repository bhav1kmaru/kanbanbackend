const mongoose = require("mongoose");

const subtaskSchema=mongoose.Schema({
    title:{type:String,required:true},
    isCompleted:{type:Boolean,default:false},
    ParentID:{type:String,required:true}
})

const SubtaskModel=mongoose.model('subtask',subtaskSchema)

module.exports={SubtaskModel}