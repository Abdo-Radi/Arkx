const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,

    },
    image:{
        type:String,
    },
    author:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const postModel = mongoose.model('post',postSchema);
module.exports = postModel;