var mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

var subMediaSchema = new mongoose.Schema({

    image : {
        type : String,
        trim : true,
        default : null,
    },

    name : {
        type : String , 
        trim : true,
        required : true
    },
    tags : {
        type : String,
        trim : true, 
        required  : true
    },
    release_date : {
        type : String,
        trim : true, 
        required  : true
    },
    director : {
        type : String,
        trim : true, 
        required  : true
    },  
     user_rating : {
        type : String,
        trim : true, 
        required  : true
    },
    storyLines : {
        type : String,
        trim : true, 
        required  : true
    },
    casts : {
        type : String,
        trim : true, 
        required  : true
    },
    video_url : {
        type : String,
        trim : true, 
        required  : true
    },
 
});

var videoModel = mongoose.model('videoModel',subMediaSchema);

module.exports = videoModel;