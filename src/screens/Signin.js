import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setName } from '../redux/action';
import '../styles/signin.css'

const Signin = () => {

  const dispatch = useDispatch()

  //navigation function is used for navigating through the screens 
  let navigate = useNavigate()

  //stores the api data inside state
  const [data, setData] = useState([])

  // //stores the input data which needs to be checked
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const email = useRef()
  const password = useRef()

  //geting the data with the help of axios from api
  const getData = async () => {
    const { data } = await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/user`);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);


  //this checks the data if presend it directs to the inner screen else not
  const handleClick = () => {
    const sendData = data.find((mail) => mail.email === email.current.value && mail.password === password.current.value);
    if (sendData) {
      dispatch(setName(sendData.name))
      sessionStorage.setItem('userName', sendData.name)
      navigate('/home')
    }
  }

  return (
    <div className='container background'>
      <div  className='signinForm'>
        <h1 className='loginHeader'>
          Welcome,
        </h1>
        <p className='loginPara'>
          Sign in to continue!
        </p>
        <input 
          className='inputs' 
          type='email' 
          placeholder='Email' 
          ref={email}
          // onChange={(val) => setEmail(val.target.value)} 
          required 
        />
        <input 
          className='inputs' 
          type='password' 
          placeholder='Password' 
          ref={password}
          // onChange={(val) => setPassword(val.target.value)}
          required 
        />
        <p>I'm a new user,<Link to="/signup" className='links'> Sign Up</Link></p>
        <button className='signin' onClick={handleClick}>Login</button>
      </div>
    </div>
  )
}

export default Signin