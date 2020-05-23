var videoModel = require('../../model/videoModel');
var mongoose = require('mongoose');

var add_video = (req,res)=>{
    // console.log('req.body',req.body.video_url);
    // console.log('req.file',req.files[0].filename);
    try{
        var a = req.body.video_url;
        // console.log('aaa',a);
        var m= a.indexOf('https')
        // console.log('mmmmmmmmm',m);
        var n= a.indexOf('" frameborder=');
        // console.log('nnnnnnnnnnnn',n);
        var video= a.slice(m,n);

        // console.log('video',video);
        

    var subMedia = new videoModel({
        image : 'uploads/'+req.files[0].filename,
        name : req.body.name,
        tags : req.body.tags,
        release_date : req.body.release_date,
        director : req.body.director,
        user_rating : req.body.user_rating,
        storyLines : req.body.storyLines,
        casts : req.body.casts,
        video_url : video,
    });
    subMedia.save((err,save)=>{
        console.log('save',save);
        if(err){
            console.log('err',err);
            return res.json({statusCode : 101, message : 'Error Occured While Saving The Data'});
        }else{
            return res.json({statusCode : 200 , message : 'Data Saved'});
        }
    })
}
catch(error){
    console.log('error',error);
    return res.json({statusCode : 101, message : 'Something Went Wrong'});
}
}

var fetchMedia = (req,res)=>{
    try{
        videoModel.find({}).then((Media)=>{
        console.log('Media',Media[0].image);
        if(Media){
            return res.json({statusCode : 200, message : 'Fetched Successfully', 
                   Media,
                   img1 : Media[0].image,
                   img2 : Media[1].image,
                   baseUrl : 'http://localhost:4100/'
        })
        }else{
            return res.json({statusCode : 101 , message : 'No Data Found',})
        }
    })
}catch(error){
    return res.json({statusCode : 101, message : 'Something Went Wrong'});
};
};

var fetchMediaById = (req,res)=>{
    try{
        videoModel.find({_id : mongoose.Types.ObjectId(req.body.mediaId) }).then((Media)=>{
        console.log('Media',Media);
        if(Media){
            return res.json({statusCode : 200, message : 'Fetched Successfully', 
                   Media,
                   baseUrl : 'http://localhost:4100/'
        })
        }else{
            return res.json({statusCode : 101 , message : 'No Data Found',})
        }
    })
}catch(error){
    return res.json({statusCode : 101, message : 'Something Went Wrong'});
};
};



module.exports = {add_video,fetchMedia,fetchMediaById};