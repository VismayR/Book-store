import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartId, setUpdatedCart } from '../redux/action';
import axios from 'axios';

const Cards = (props) => {

  const { data } = useSelector(state => state.cartItemsReducer);

  const dispatch = useDispatch();

  //changing the add button to delete button on click
  const [switchButtons, setSwitchButtons] = useState(false)

  //posting data on button click to redux and cart database
  const addToCart = async () => {
    await axios.post(`https://6389ff3cc5356b25a20ec46a.mockapi.io/Cart`, { ...props.book, username: sessionStorage.getItem('userName') })
      .then(res =>
        dispatch(setCartId(res.data)),
        setSwitchButtons(true)
      )
      .catch(error => console.log(error));
  }

  //deleting data from the cart database and updating redux
  const deleteFromCart = async () => {
    const d = data && data.find((res) => res?.id === props.book.id)
    await axios.delete(`https://6389ff3cc5356b25a20ec46a.mockapi.io/Cart/${d.cartId}`)
      .then(async () =>
        await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/Cart`)
          .then(res => 
            dispatch(setUpdatedCart(res.data)),
            setSwitchButtons(false)
            )
          .catch(error => console.log(error)),
      )
      .catch(error => console.log(error))
  }

  //handeling button change 
  useEffect(()=>{
    const w = data.find(res=>res.id === props.book.id)
    if(w){
      setSwitchButtons(true)
    }else{
      setSwitchButtons(false)
    } 
  },[data])

  return (
    <>
      <div style={{ borderRadius: '10px', width: '300px', height: '230px', padding: 'auto', margin: '40px 10px 30px', boxSizing: 'border-box', backgroundColor:'#4488cc', boxShadow:'10px 10px 15px gray' }}>
        <h1 style={{ textAlign: 'center', fontSize: '20px', color:'black' }}>{props.book.name}</h1>
        <p style={{ paddingLeft: '20px', paddingRight: '20px', margin: '0px', fontSize: '12px', height: "70px", color:'black' }}>{props.book.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '20px', marginLeft: '20px', color:'black' }}>
          <p style={{ fontWeight: "bold" }}>{props.book.author}</p>
          <p style={{ fontWeight: "bold" }}>₹<span>{props.book.price}</span></p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {switchButtons === false ?
            <button
              style={{ backgroundColor: 'white', padding: '0.6rem', border: 'none', borderRadius: '8px', color: 'black', cursor: 'pointer' }}
              onClick={addToCart}
            >Add to cart</button> :
            <button
              style={{ backgroundColor: 'white', padding: '0.6rem', border: 'none', borderRadius: '8px', color: 'black', cursor: 'pointer' }}
              onClick={deleteFromCart}
            >Remove from cart</button>
          }
        </div>
      </div>
    </>
  )
}

export default Cards