import React, { useState, useEffect } from 'react';
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

  //stores the input data which needs to be checked
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const dat = data.find((mail) => mail.email === email && mail.password === password);
    if (dat) {
      dispatch(setName(dat.name))
      sessionStorage.setItem('userName', dat.name)
      navigate('/home')
    }
  }

  return (
    <div className='container'>
      <div  className='signinForm'>
        <h1>Sign In</h1>
        <input className='inputs' type='email' placeholder='Email' onChange={(val) => setEmail(val.target.value)} required />
        <input className='inputs' type='password' placeholder='Password' onChange={(val) => setPassword(val.target.value)} required />
        <p>For <Link to="/signup" className=''> Registration</Link></p>
        <button className='signin' onClick={handleClick}>Signin</button>
      </div>
    </div>
  )
}

export default Signin