import multer from 'multer';

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

export const uplaod=multer({
    //storage:storage    we can use below one beacuase we r using es6
    storage,
})