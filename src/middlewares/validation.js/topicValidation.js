const joi = require("joi");
const APIError = require("../../utils/errors");
const Topic = require("../../models/topicmodel");

class topicValidation {
    constructor() {}

    static create = async (req, res, next) => {
        try {
            await joi.object({
                title: joi.string().trim().min(3).max(30).required().messages({
                    "string.base": "Başlık Alanı Metin Şeklinde Olmalıdır",
                    "string.empty": "Başlık Alanı Boş Olamaz",
                    "string.min": "Başlık Alanı Min: 3 Karakter Olabilir",
                    "string.max": "Başlık Alanı Max: 30 Karakter Olabilir",
                    "any.required": "Başlık Alanı Zorunludur" 
                })
            }).validateAsync(req.body);

            const existingTopic = await Topic.findOne({ title: req.body.title });
            if (existingTopic) {
                return next(new APIError("Bu başlık zaten mevcut", 400));
            }

            next(); // burada kullanma sebebim varsa bir sonraki middlewr. a geçmesi için authvaldan farklı denedim bu da çalıştı

        } catch (error) {
            if (error.details && error.details[0].message) {
                return next(new APIError(error.details[0].message, 400));
            } else {
                return next(new APIError("Lütfen Validasyon Kurallarını Kontrol edin", 400));
            }
        }
    }
}

module.exports = {
    topicValidation
};
