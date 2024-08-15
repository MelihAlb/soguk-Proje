const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation {
    constructor() {}

    static register = async (req, res, next) => {
        try {
            await joi.object({
                nick: joi.string().trim().min(3).max(25).required().messages({
                    "string.base": "nick Alanı Metin Şeklinde Olmalıdır",
                    "string.empty": "nick Alanı Boş Olamaz",
                    "string.min": "nick Alanı Min: 3 Karakter Olabilir",
                    "string.max": "nick Alanı Max: 25 Karakter Olabilir",
                    "any.required": "nick Alanı Zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "Mail Alanı Metin Şeklinde Olmalıdır",
                    "string.email": "Geçerli Mail Girilmelidir",
                    "string.empty": "Mail Alanı Boş Olamaz",
                    "string.min": "Mail Alanı Min: 3 Karakter Olabilir",
                    "string.max": "Mail Alanı Max: 50 Karakter Olabilir",
                    "any.required": "Mail Alanı Zorunludur"
                }),
                password: joi.string().trim().min(6).max(25).required().messages({
                    "string.base": "Şifre Alanı Metin Şeklinde Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz",
                    "string.min": "Şifre Alanı Min: 6 Karakter Olabilir",
                    "string.max": "Şifre Alanı Max: 25 Karakter Olabilir",
                    "any.required": "Şifre Alanı Zorunludur"
                })
            }).validateAsync(req.body);
        } catch (error) {
            if (error.details && error.details[0].message)
                throw new APIError(error.details[0].message, 400);
            else throw new APIError("Lütfen Validasyon Kurallarını Kontrol edin", 400);
        }
        next();
    }

    static login = async (req,res,next)=>{
        try {
            await joi.object({
                mail: joi.string().email().trim().min(3).max(25).required().messages({
                    "string.base": "Mail Alanı Metin Şeklinde Olmalıdır",
                    "string.email": "Geçerli Mail Girilmelidir",
                    "string.empty": "Mail Alanı Boş Olamaz",
                    "string.min": "Mail Alanı Min: 3 Karakter Olabilir",
                    "string.max": "Mail Alanı Max: 25 Karakter Olabilir",
                    "any.required": "Mail Alanı Zorunludur"
                }),
                password: joi.string().trim().min(6).max(25).required().messages({
                    "string.base": "Şifre Alanı Metin Şeklinde Olmalıdır",
                    "string.empty": "Şifre Alanı Boş Olamaz",
                    "string.min": "Şifre Alanı Min: 6 Karakter Olabilir",
                    "string.max": "Şifre Alanı Max: 25 Karakter Olabilir",
                    "any.required": "Şifre Alanı Zorunludur"
                })
            })
        } catch (error) {
            if (error.details && error.details[0].message)
                throw new APIError(error.details[0].message, 400);
            else throw new APIError("Lütfen Validasyon Kurallarını Kontrol edin", 400);
        }
        next();
    }


}

module.exports = AuthValidation;