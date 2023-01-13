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

const { protect } = require('../middleware/authMiddleware')

// Getting all
router.get('/', protect, getQuestions)

// Getting one
router.get('/:id', getQuestion)

// Getting random
questionRouter.get('/', getRandomQuestion)

// Creating one
router.post('/', protect, setQuestion)

// Updating one
router.put('/:id', protect, updateQuestion)

// Deleting one
router.delete('/:id', protect, deleteQuestion)

module.exports = router