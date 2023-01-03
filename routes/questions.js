const express = require('express')
const router = express.Router()
const questionRouter = express.Router({ mergeParams: true });
router.use('/random', questionRouter)
const Question = require('../models/question')
const {
    getQuestions,
    getQuestion,
    getRandomQuestion,
    setQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController')

// Getting all
router.get('/', getQuestions)

// Getting one
router.get('/:id', getQuestion)

// Getting random
questionRouter.get('/', getRandomQuestion)

// Creating one
router.post('/', setQuestion)

// Updating one
router.put('/:id', updateQuestion)

// Deleting one
router.delete('/:id', deleteQuestion)

module.exports = router