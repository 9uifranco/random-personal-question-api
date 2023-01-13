import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteQuestion, updateQuestion } from '../features/questions/questionSlice'


function QuestionItem({question}) {

    const [toggleEdit, setToggleEdit] = useState(false)

    const [formData, setFormData] = useState({
        text: '',
        category: '',
        isValid: false
    })

    const { text, category } = formData

    const dispatch = useDispatch()

    const deleteQuestion = (e) => {
        e.preventDefault()
        dispatch(deleteQuestion(question._id))
    }

    const cancelEdit = (e) => {
        e.preventDefault()

        setFormData({
            text: '',
            category: '',
            isValid: false
        })

        setToggleEdit(false)
    }

    const editQuestion = (e) => {
        e.preventDefault()
        setToggleEdit(true)
    }

    const onSubmit = (e) => {
        e.preventDefault()
             
        const questionData = {
            text,
            category,
            isValid: true
        }

        console.log(questionData)

        dispatch(updateQuestion(question._id, questionData))
        
        setFormData({
            text: '',
            category: '',
            isValid: false
        })

        setToggleEdit(false)
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            <div>
                {new Date(question.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{question.text}</h2>
            <h3>{question.category}</h3>
            <h3>Valid? {question.isValid ? 'Yes' : 'No'}</h3>
            <button onClick={deleteQuestion}>DELETE</button>
            
            {toggleEdit ? (
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor="text">Question</label>
                        <input
                            type="text"
                            name='text'
                            id='text'
                            value={text}
                            onChange={onChange}
                        />
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            name='category'
                            id='category'
                            value={category}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit'>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                    
                </form>
            ) : (
                <button onClick={editQuestion}>EDIT</button>
            )}
        </div>
    )
}

export default QuestionItem