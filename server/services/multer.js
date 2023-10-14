const multer=require('multer')
const storage=multer.memoryStorage()

const ALLOWED_FORMAT=['image/jpeg','image/png','image/jpg','image/avif']

const upload=multer({
 storage,
 fileFilter:function(req,file,cb){
  if(ALLOWED_FORMAT.includes(file.mimetype)){
    console.log(22)
    cb(null,true)
  }else{
    console.log(32)
    cb(new Error('NOT supported file Format'),false)
    console.log(42)

  }
}

})
module.exports=upload
