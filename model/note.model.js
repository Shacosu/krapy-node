const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    }
});

module.exports = model('Note', noteSchema);