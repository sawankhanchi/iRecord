const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Record = new Schema({
    artist: {
        type: String
    },
    cover: {
        type: String
    }
});

module.exports = mongoose.model('Record', Record);