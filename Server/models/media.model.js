const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['mp4', 'jpg', 'gif', 'pdf'] }, //mp4, jpg, gif, ...
    mimetype: { type: String, required: true },
    md5: { type: String, required: true, index: { unique: true, dropDups: true } },
    file: { type: String, required: true },
    timeToSend: { type: Date, required: true },
    sent: { type: Boolean, default: false },
    seenList: { type: [] },
    isDeleted: { type: Boolean, default: false }
});
const mediaModel = mongoose.model('media', mediaSchema);
module.exports = mediaModel;
