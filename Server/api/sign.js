var user = require('../model/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';

var register = (req,res)=>{
    try{
    user.findOne({email : req.body.email}).then((User)=>{
        var log = new user({
            name : req.body.fullName,
            email : req.body.email,
            password : req.body.password,
        });
        if(User){
            return res.json({statusCode : 101, status : false , message : 'E-mail Already Registered Please Try With Differernt E-mail id'})
        }
        if(!User){        
        log.save(function(err,save){
            console.log('err',err);
            if(err){
                return res.json({statusCode : 101 , status : false , message : err });
            }else {
                return res.json({statusCode: 200 , status : true , message : 'save',result : save});
            }
        })
    }
    })
}catch(error) {
    return res.json({statusCode : 101 , status : false , message : 'Something Wrong' });
}
};

// fetchSubAdminData = (req,res)=>{
//     try{
//         console.log('req.body',req.currentUser);
//         admin.findOne({_id: req.decoded._id}).then((subAdmin)=>{
//             if(subAdmin){
//                 return res.json({statusCode : 200,status : true, subAdmin})
//             }else{
//                 return res.json({statusCode : 101 , status : false , message : 'No Data Found'})
//             }
//         })
//     }catch(error){
//         console.log('error',error);
//         return res.json({statusCode : 101, status : false , message : 'Something Wrong'});
//     }
// }

var signin = (req,res)=>{
    try{
    var log = ({
        email : req.body.email,
        password : req.body.password
    });
    user.findOne({email : log.email}).then((user)=>{
        console.log(user);
        if(!user){
            return res.json({statusCode : 101 , status : false , message : 'User Not Found'});
        }
        if(user.password==log.password){
            const token = jwt.sign({ _id: user._id }, JWTSECRET);
            console.log('token',token);
            return res.json({statusCode : 200 ,
                             status : true ,
                             token : token,
                             userData : user,
                             message : 'Login Successfully'
                            });
        }else {
            return res.json({statusCode : 101 , status : false , message : 'Wrong Password'});
        }
    });
}catch(error) {
    return res.json({statusCode : 101 , status : false , message : 'Something Wrong' });
}
}

module.exports = {register,signin};