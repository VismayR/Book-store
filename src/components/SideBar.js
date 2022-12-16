import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdatedCart } from '../redux/action';
import '../styles/Home.css'


const SideBar = () => {
  const { data } = useSelector(state => state.cartItemsReducer);
  const { cartActive } = useSelector(state => state.cartActiveReducer);

  const dispatch = useDispatch()

  //deleting the product that is not required from the cart
  const deleteFromCart = async (cartProd) => {
    await axios.delete(`https://6389ff3cc5356b25a20ec46a.mockapi.io/Cart/${cartProd.cartId}`)
      .then(async () =>
        await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/Cart`)
          .then(res => dispatch(setUpdatedCart(res.data)))
          .catch(error => console.log(error)))
  }

  //calculating the total cost of all products in the cart
  let total = 0
  data.map(res => {
    total = total + Number(res.price)
  })

  return (
    <div className={cartActive ? 'sidebar_open' : 'sidebar_close'}>
      <h1 className=''>Cart</h1>
      <p>Total number of products: <span className='total'>{data.length}</span></p>
      <p>Total cost: <span className='total'>₹{total}</span></p>
      {data && data.map((dat) => (
        <>
          <ul key={dat?.cartId} className='cartDiv'>
            <li><p>{dat?.name}</p></li>
            <li style={{ display: 'flex' }}>
              <p>₹<span>{dat?.price}</span></p>
              <button style={{ background: 'none', border: 'none', margin: '4px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => deleteFromCart(dat)}>X</button>
            </li>
          </ul>
        </>
      ))}
    </div>
  )
}

export default SideBar