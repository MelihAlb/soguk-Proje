const User = require('../models/usermodel');
const Topic = require('../models/topicmodel');
const Entry = require('../models/entrymodel');
const APIError = require("../utils/errors");

const getUserContent = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            throw new APIError("Kullanıcıya ait bir işlem bulunamadı", "404");
        }

        const topicsPromise = Topic.find({ createdBy: userId });
        const entriesPromise = Entry.find({ createdBy: userId }).populate('topic', 'name');

        const [topics, entries] = await Promise.all([topicsPromise, entriesPromise]);

        if (!topics.length && !entries.length) {
            throw new APIError("Kullanıcıya ait içerik bulunamadı", "404");
        }

        
        return res.status(200).json({
            message: "Kullanıcı içeriği başarıyla getirildi",
            data: {
                user: {
                    id: user._id,
                    nick: user.nick,
                    email: user.email
                },
                topics,
                entries
            }
        })&&console.log("Kulllanıcıya ( "+ user.nick +" ) ait contentler döndü ");
        
    } catch (error) {
        console.error('Hata:', error);
        return new APIError("İşlem gerçekleştirilemedi", "500");
    }
};

const getUserTopics = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            throw new APIError("Kullanıcı bulunamadı", "401");
        }

        console.log("Kullanıcı bulundu:", user);

        const topics = await Topic.find({ createdBy: userId });
        if (!topics.length) {
            throw new APIError("Kullanıcıya ait başlık bulunamadı", "404");
        }

        console.log("Kullanıcının başlıkları bulundu:", topics);

        return res.status(200).json({
            message: "Kullanıcıya ait başlıklar başarıyla getirildi",
            data: {
                user: {
                    id: user._id,
                    nick: user.nick,
                    email: user.email
                },
                topics
            }
        });

    } catch (error) {
        console.error('Hata:', error);
        throw new APIError("İşlem gerçekleştirilemedi", "500");
    }
};

const getUserEntries = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            throw new APIError("Kullanıcı bulunamadı", "401");
        }

        console.log("Kullanıcı bulundu:", user);

        const entries = await Entry.find({ createdBy: userId });
        if (!entries.length) {
            throw new APIError("Kullanıcıya ait entry bulunamadı", "404");
        }

        console.log("Kullanıcının entries bulundu:", entries);

        return res.status(200).json({
            message: "Kullanıcıya ait entries başarıyla getirildi",
            data: {
                user: {
                    id: user._id,
                    nick: user.nick,
                    email: user.email
                },
                entries
            }
        });

    } catch (error) {
        console.error('Hata:', error);
        throw new APIError("İşlem gerçekleştirilemedi", "500");
    }
};

module.exports = {
    getUserContent,
    getUserTopics,
    getUserEntries
};