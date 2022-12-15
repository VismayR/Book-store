import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Components
import Cards from '../components/Cards';
import Nav from '../route/Nav';
import SideBar from '../components/SideBar';
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';


const Home = () => {

  //all data of category is stored
  const [data, setData] = useState([]);

  //specific category data is stored 
  const [dat, setDat] = useState([]);

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');

  let navigate = useNavigate();

  //validation
  const validate = () => {
    if (sessionStorage.getItem('userName') === '') {
      navigate('/')
    }
  }
  useEffect(() => {
    validate()
  })

  //handling change in categories
  const handleCatChange = (event) => {
    setCategory(event.target.value);
    setSubCategory('')

    //used for category display
    event.target.value != "" ?
      setDat(data.find((cat) => cat.category === event.target.value)?.subcategory) :
      setDat('')

  }
  //handling change in subcategories
  const handleSubCatChange = (event) => {
    setSubCategory(event.target.value);
  }

  //handaling search
  const [search, setSearch] = useState('')

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
  }

  //Getting data from the category api
  const getData = async () => {
    const { data } = await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/categories`)
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //all the book data coming from api is stored in this state
  const [bookdata, setBookData] = useState([])

  //getting the book data from the api with the use of axios and using async await function
  const getBookData = async () => {
    const { data } = await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/books`)
    setBookData(data);
  };
  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      <Nav />
      <div style={{ position: 'relative',backgroundColor:'#323337', minHeight:'90vh' }} >
        <div>
          <div>
            <select  value={category} onChange={handleCatChange} style={{ width: '15rem', margin: '1rem', padding:'10px', borderRadius:'5px' }}>
              <option value='' selected>All Categories</option>
              {
                data && data.map((cat) => (<option key={cat.id} value={cat.category}>{cat.category}</option>))
              }
            </select>
            <select  value={subCategory} onChange={handleSubCatChange} style={{ width: '20rem', margin: '1rem', padding:'10px', borderRadius:'5px' }}>
              <option value='' selected>All Subcategories</option>
              {
                dat && dat.map((cat, index) => (<option key={index} value={cat}>{cat}</option>))
              }
            </select>
            <input  placeholder='Search' onChange={handleSearch} style={{ margin: '1rem', padding:'10px', borderRadius:'5px' }} />
          </div>
          {/* <h2 style={{ textAlign: 'center' }}>All Books Display</h2> */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto' }}>
            {// map function is used for looping the data and displaying individual values. Filtering with category, Subcategory and search is done here.
              category !== '' ?
                subCategory !== '' ?
                  bookdata.filter(book => book.author !== sessionStorage.getItem('userName') && book.category === category && book.subcategory === subCategory && book.name.match(search)).map((book) => (
                    <Cards book={book} key={book.id}/>
                  )) :
                  bookdata.filter(book => book.author !== sessionStorage.getItem('userName') && book.category === category && book.name.match(search)).map((book) => (
                    <Cards book={book} key={book.id}/>
                  )) :
                bookdata.filter(book => book.author !== sessionStorage.getItem('userName') && book.name.match(search)).map((book) => (
                  <Cards book={book}  key={book.id}/>
                ))
            }
          </div>
        </div>
        <SideBar/>
      </div>
    </>
  )
}

export default Home