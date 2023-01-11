const Question = require('../models/question')
const asyncHandler = require('express-async-handler')

const getQuestions = asyncHandler(async (req, res) => {
    try {
        const questions = await Question.find()
        res.status(200).json(questions)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

const getQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id)

    if(!question) {
        res.status(400)
        throw new Error('Question not found')
    }

    res.status(200).json(question)
})

const getRandomQuestion = asyncHandler(async  (req, res) => {
    try {
        // Get a random question from the database
        const question = await Question.aggregate([{ $sample: { size: 1 } }]);

        // Send the question as the response
        res.status(200).send(question);
    } catch (error) {
        res.status(500).send(error);
    }    
})

const setQuestion = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text to your text')
    }

    const newQuestion = await Question.create({
        text: req.body.text,
        category: req.body.category,
        isValid: false
    })

    res.status(201).json(newQuestion)
})

const updateQuestion = asyncHandler(async  (req, res) => {
    const question = await Question.findById(req.params.id)

    if(!question) {
        res.status(400)
        throw new Error('Question not found')
    }

    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedQuestion)
})

const deleteQuestion = asyncHandler(async  (req, res) => {
    const question = await Question.findById(req.params.id)

    if(!question) {
        res.status(400)
        throw new Error('Question not found')
    }

    await question.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getQuestions,
    getQuestion,
    getRandomQuestion,
    setQuestion,
    updateQuestion,
    deleteQuestion, 
}