const APIError = require("../utils/errors");

const errorHandlerMiddleWare = (err,req,res,next)=>{
    console.error(err); 
    if (err instanceof APIError){
        return res.status(err.statusCode||400).json({
            succes:false,message:err.message,statusCode:err.statusCode
        })
    }
    return res.status(500).json({
        succes:false,message: console.log(err)

    })
}
module.exports=errorHandlerMiddleWare;