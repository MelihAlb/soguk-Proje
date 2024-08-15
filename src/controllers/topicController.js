const mongoose = require('mongoose');
const Topic = require("../models/topicmodel");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

const createTopic = async (req, res) => {
    try {
        const { title } = req.body;
        const topic = new Topic({
            title,
            createdBy: req.user._id
        });
        console.log("kontrol1")
        if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
            return next(new APIError('Geçersiz kullanıcı ID\'si', 400));
        }
        
        await topic.save();
        return new Response(topic, "Başlık başarıyla oluşturuldu", 201).created(res);
    } catch (error) {
        console.error('Başlık oluşturma hatası:', error);
        throw new APIError("Başlık oluşturma sırasında bir hata oluştu", 400);
    }
};
const getTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        if (!topics || topics.length === 0) {
            throw new APIError("Başlıklar bulunamadı","401");
        }
        return res.status(200).json({ 
            message: "Başlıklar başarıyla getirildi", 
            data: topics
        })
        
        
    } catch (err) {
        console.error('getTopics error:', err);
        throw new APIError("Başlık getirilirken bir hata oluştu","401");
    }
};

module.exports = {
    createTopic,
    getTopics
};
