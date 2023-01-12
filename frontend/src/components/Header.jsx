import React from 'react'
import { FaBeer } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice';

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header>
            <div>
                <Link to='/'>QuestionSetter</Link>
            </div>
            <ul>
                {user ? (
                <li>
                    <button onClick={onLogout}>
                        <FaBeer/> Logout
                    </button>
                </li>
                ) : (<>
                
                <li>
                    <Link to='/register'>
                        <FaBeer/> Register
                    </Link>
                </li>
                <li>
                    <Link to='/login'>
                        <FaBeer/> Login
                    </Link>
                </li>
                
                </>)}
                
            </ul>
        </header>
    )
}

export default Header