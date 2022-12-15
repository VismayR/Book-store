import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/action';

const Signup = () => {

    const dispatch = useDispatch()

    //navigation function is used for navigating through the screens 
    let navigate = useNavigate()

    //stores the input data which is to be posted
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //posting the data received from the input via api only if the data is not an empty data
    const postData = () => {
        let data = {
            name: username,
            email: email,
            password: password
        }
        if (username !== '' && email !== '' && password !== '') {
            dispatch(setName(username))
            const response = axios.post(`https://6389ff3cc5356b25a20ec46a.mockapi.io/user`, data).then(navigate('/home'));
        }
    };

    return (
        <div  className='signinForm'>
            <h1>Sign Up</h1>
            <input className='inputs' type='text' placeholder='Name' onChange={(val) => setUserName(val.target.value)} required />
            <input className='inputs' type='email' placeholder='Email' onChange={(val) => setEmail(val.target.value)} required />
            <input className='inputs' type='password' placeholder='Password' onChange={(val) => setPassword(val.target.value)} required />
            <input className='inputs' type='password' placeholder='Check Password' required />
            <p>If already<Link to="/" className=''> Register</Link></p>
            <button className='signin' onClick={postData}>Signup</button>
        </div>
    )
}

export default Signup