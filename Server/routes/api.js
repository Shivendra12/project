var express = require('express');
var router = express.Router();
var Register = require('../api/sign');
var Video = require('../api/subCategory/subMedia');
var jwt = require('jsonwebtoken');
var JWTSECRET = 'shivendra123';
var user = require('../model/user');

var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
      // console.log('FIleNAME',file);
    cb(null, file.fieldname + '_' + Date.now()+path.extname(file.originalname));
  }
})
// console.log('storage',storage);
 const fileFilter = (req,file,cb)=>{
  // console.log('fileFilter',file);

     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'text/csv' || file.mimetype === 'application/octet-stream' || file.mimetype === 'application/pdf'){
      cb(null,true)
     }else{
      cb(new Error('Not support file format'),false)
     }
 }
var upload = multer({ storage: storage ,
  limits:{fieldSize:1024 * 1024 * 5,},
     fileFilter:fileFilter
    }).any('file');

    const authentication = (req, res, next) => {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    
      if (req.method !== "OPTIONS") {
        var token = req.headers.authorization;
        console.log('Authenticate',req);
          if (token) {
            jwt.verify(token, JWTSECRET, function (err, decoded) {
              if (err) {
                return res.json({statusCode : 101 , status : false , message : 'Invalid Token'});
              } else {
                req.decoded = decoded;
                User.findOne({_id : decoded._id} , ((err,rows)=>{
                  if(err){
                    return res.json({statusCode : 101 , status : false , message : 'Token Not Found'})
                  }else{
                    if(typeof rows !== 'undefined'){
                      req.currentUser = rows;
                      console.log('currentUser',req.currentUser);
                      next();
                    }
                    else{
                      return res.json({statusCode : 101 , status : false , message : 'Some error occured'});
                    }
                  }
                }))
              }
            });
          } else {
            return res.json({statusCode : 101 , status : false , message : 'Authentication Failure'});
          }
      
        }
    
    };
     

//User Router

router.post('/signin',Register.signin);
router.post('/register',Register.register);
router.post('/addVideo',upload,Video.add_video);
router.post('/fetchMedia',Video.fetchMedia);
router.post('/fetchMediaById',Video.fetchMediaById);


module.exports = router;
