var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   
    name : {
        type : String, 
        trim : true,
        required : true,
    },
    email : {
        type : String,
        trim  : true,
        required : true,
        createIndexes : {
            unique : true
        }
    },
    password : {
        type : String,
        trim : true,
        required : true,
    },
   
    date:{
        type: Date, 
        default: Date.now },
   
    
});

var user = mongoose.model('user',userSchema);

module.exports = user;

