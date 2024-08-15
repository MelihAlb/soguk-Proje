const mongoose = require('mongoose');
const Entry = require("../models/entrymodel");
const Topic = require("../models/topicmodel");
const APIError = require("../utils/errors");
const Response = require("../utils/response");


const createEntry = async (req, res) => {
    try {
        const { content, topicName } = req.body;
        const createdBy = req.user._id;

        const topic = await Topic.findOne({ title: topicName });
        if (!topic) {
            throw new APIError('Başlık bulunamadı', 404);
        }

        const entry = new Entry({
            content,
            createdBy,
            topic: topic._id
        });

        await entry.save();

        res.status(201).json({
            success: true,
            message: 'Entry başarıyla oluşturuldu',
            data: entry
        });
    } catch (error) {
        if (error instanceof APIError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Entry oluşturulurken bir hata oluştu' });
        }
    }
};
const getAllEntries = async (req, res) => {
    try {
       
        const entries = await Entry.find()
        if (!entries || entries.length === 0) {
            return res.status(404).json({ message: "Girdi bulunamadı" });
        }


        return res.status(200).json({
            message: "Girdiler başarıyla getirildi",
            data: entries
        });
    } catch (error) {
        console.error('Hata:', error); // Hata loglaması
        return res.status(500).json({ message: 'Girdiler getirilirken bir hata oluştu' });
    }
};

module.exports = {
    createEntry,
    getAllEntries
};
