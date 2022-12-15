import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/images/cart1.png'
import { setCartIsActive, setName } from '../redux/action';

const Nav = () => {

  const { cartActive } = useSelector(state => state.cartActiveReducer)

  //navigation function is used for navigating through the screens
  let navigate = useNavigate();

  //authentication
  const dispatch = useDispatch()
    
  const handleClick = ()=>{
    // setIsActive(!isActive)
    dispatch(setCartIsActive(!cartActive))
  }

  const signout =()=>{
    sessionStorage.setItem('userName','')
    dispatch(setName(''))
    navigate('/')
  }

  return (
    <div style={{ backgroundColor: "#4488cc", color: "white", padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div><span style={{fontWeight:'bold', fontSize:'24px'}}>{sessionStorage.getItem('userName')}</span></div>
      <div>
        <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/addBook')}>Add book</button>
        <button style={{ background: "none",border: 'none',cursor: 'pointer', color: "white" }} onClick={signout}>Sign out</button>
        <img src={cart} style={{width:'25px',cursor: 'pointer'}} onClick={handleClick}/>
      </div>
    </div>
  )
}

export default Nav