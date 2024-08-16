const Joi = require('joi');
const APIError = require("../../utils/errors");

class entryValidation {
    constructor() {}
        
    static create = async (req, res, next) => {
        try {
            await Joi.object({
                content: Joi.string().trim().min(10).max(500).required().messages({
                    "string.base": "İçerik Alanı Metin Şeklinde Olmalıdır",
                    "string.empty": "İçerik Alanı Boş Olamaz",
                    "string.min": "İçerik Alanı Min: 10 Karakter Olmalıdır",
                    "string.max": "İçerik Alanı Max: 500 Karakter Olmalıdır",
                    "any.required": "İçerik Alanı Zorunludur"
                })
            }).unknown(true).validateAsync(req.body);
            next();
        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            } else {
                return next(new APIError("Lütfen Validasyon Kurallarını Kontrol edin", 400));
            }
        }
    }
}


module.exports ={ 
    entryValidation
}