const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Kullanıcı modeline referans
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: "topics",
    timestamps: true,
});
const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;