const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comment = new Schema({
    text: {
        type: String,
        required: true,
    },
    createDate: Date,
    username: String,
    // articleID: String
});

module.exports = mongoose.model('comment', comment);