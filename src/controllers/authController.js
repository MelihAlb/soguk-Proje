const {response}= require("express");
const user = require("../models/usermodel");
const bcrypt = require("bcrypt"); 
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");

const register = async(req,res)=>{
    const {email}=req.body

    const userCheck = await user.findOne({email: req.body.email})
    if(userCheck){
        throw new APIError ("Bu mail başka hesaba ait",401);
    }else {
        req.body.password = await bcrypt.hash(req.body.password,10)
    }

    const userSave = new user(req.body);

    await userSave.save()
        .then((data)=>{
            return new Response(data,"Kayıt İşlemi başarılı ",201).created(res)
        })
        .catch((err)=>{
            throw new APIError("Kayıt işlemi başarısız",400)
        })
}
const login = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    // kullanıcı email var mı kontrol ediyorum burada
    const userCheck = await user.findOne({email:req.body.email});
    console.log(userCheck)
    if(!userCheck){
        throw new APIError("Girilen alanları kontrol edin","401");
    }
    const comparePass=await bcrypt.compare(req.body.password,userCheck.password)
    if(!comparePass){
        //burada ekstra işlem yapmak istemedim hatayı böyle attım
        throw new APIError("Şifre için 3 deneme hakkınız kaldı","401");
    }
    createToken(userCheck,res);
}
module.exports={
    register,
    login
}