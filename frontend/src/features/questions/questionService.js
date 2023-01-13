import axios from "axios";

const API_URL = '/api/questions/'

// Create new question
const createQuestion = async (questionData, token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, questionData, config)

    return response.data
}

// Get all questions
const getQuestions = async (token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete question
const deleteQuestion = async (questionID, token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + questionID, config)

    return response.data
}

// Update question
const updateQuestion = async (questionID, questionData, token) => {
    const config = { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + questionID, questionData, config)

    return response.data
}

const questionService = {
    createQuestion,
    getQuestions,
    deleteQuestion,
    updateQuestion
}

export default questionService