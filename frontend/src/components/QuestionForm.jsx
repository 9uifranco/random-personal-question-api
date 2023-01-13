import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createQuestion } from '../features/questions/questionSlice'

function QuestionForm() {
    //const [text, setText] = useState('')

    const [formData, setFormData] = useState({
        text: '',
        category: '',
    })

    const { text, category } = formData
    
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        const questionData = {
            text,
            category
        }

        dispatch(createQuestion(questionData))

        setFormData({
            text: '',
            category: ''
        })

        //dispatch(createQuestion({formData}))
        //setText('')
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
  
    return (
        <section>
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
                    <button type='submit'>Add question</button>
                </div>
            </form>
        </section>
    )
}

export default QuestionForm