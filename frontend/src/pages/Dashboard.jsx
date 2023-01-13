import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import QuestionForm from '../components/QuestionForm'
import Spinner from '../components/Spinner'
import { getQuestions, reset } from '../features/questions/questionSlice'
import QuestionItem from '../components/QuestionItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {questions, isLoading, isError, message} = useSelector((state) => state.questions)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }
    else {
      dispatch(getQuestions())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, navigate, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <section>
      <h1>Welcome {user && user.name}</h1>
      <p>Questions Dashboard</p>
    </section>
    <QuestionForm />
    <section className='content'>
      {questions.length > 0 ? (
        <div className='questions'>
            {questions.map((question) => (
              <QuestionItem key={question._id} question={question} />
            ))}
        </div>
      ) : (
        <h3>There are no questions here.</h3>
      )}
    </section>
  </>
}

export default Dashboard