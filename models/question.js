const mongoose = require('mongoose')

const questionsSquema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    }
})

const Question = mongoose.model('Question', questionsSquema)

module.exports = Question 