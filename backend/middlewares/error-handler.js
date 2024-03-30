const errorHandler = async(err,req,res,next)=>{
    console.log(err);
    return res.status(500).json({msg: "Something went wrong, try again later"});
}

module.exports=errorHandler