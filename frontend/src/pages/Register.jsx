import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner'

const dispatch = useDispatch;

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password 
            }
            dispatch(register(userData))
        }
    }

    if(isError) {
        return <Spinner/>
    }

    return (
        <>
            <section>
                <h1>Register</h1>
                <p>Please create an account</p>
            </section>

            <section>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" id='name' name='name' value={name} placeholder="Enter your name" onChange={onChange} />
                        <input type="email" id='email' name='email' value={email} placeholder="Enter your email" onChange={onChange} />
                        <input type="password" id='password' name='password' value={password} placeholder="Enter your password" onChange={onChange} />
                        <input type="password" id='password2' name='password2' value={password2} placeholder="Confirm your password" onChange={onChange} />
                    </div>
                    <div>
                        <button type='submit'>
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register