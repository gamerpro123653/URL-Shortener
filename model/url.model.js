const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlID: {
        type: String,
        required: true,
    },
    originURL : {
        type: String,
        required: true,
    },
    shortURL : {
        type: String,
        required: true,
    },
    accessCounts : {
        type: Number,
        required: true,
        default: 0
    },
    finishRecapchaCounts : {
        type: Number,
        required: true,
        default: 0
    },
    createdDate: {
        type: String,
        default: Date.now,
    }
});

const Url = mongoose.model("Urls", urlSchema);

module.exports = {
    Url
}