import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const AddBooks = () => {

    const { name } = useSelector(state => state)

    //navigation function is used for navigating through the screens 
    let navigate = useNavigate()

    //validation
    const validate = ()=>{
        if(sessionStorage.getItem('userName') === ''){
        navigate('/')
        }
    }
    useEffect(()=>{
        validate()
    })

    //all data of category is stored
    const [data, setData] = useState([]);

    //specific category data is stored 
    const [dat, setDat] = useState([]);

    //handling change in categories
    const handleCatChange = (event) => {
        setCategory(event.target.value);
        setDat(data.find((cat) => cat.category === event.target.value)?.subcategory);
    }
    //handling change in subcategories
    const handleSubCatChange = (event) => {
        setSubCategory(event.target.value);
    }

    //Getting data from the category api
    const getData = async () => {
        const { data } = await axios.get(`https://6389ff3cc5356b25a20ec46a.mockapi.io/categories`);
        setData(data);
    };
    useEffect(() => {
        getData();
    }, []);

    //stores the input data which is to be posted
    const [bookname, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [price, setPrice] = useState('');
    const author = sessionStorage.getItem('userName');


    //posting the data received from the input via api into books api
    const postData = async () => {
        let data = {
            name: bookname,
            description: description,
            price: price,
            category: category,
            subcategory: subCategory,
            author: author
        }

        const response = await axios.post(`https://6389ff3cc5356b25a20ec46a.mockapi.io/books`, data).then(navigate('/home'));
    };

    return (
        <div  className='signinForm'>
            <h1>Add Book</h1>
            <input  className='inputs' type='text' style={{  }} placeholder='Book Title' onChange={(val) => setBookName(val.target.value)} required />
            <textarea  className='inputs' placeholder='Add Description' onChange={(val) => setDescription(val.target.value)} required />
            <select  className='inputs' onChange={handleCatChange}>
                <option value=''>Select category</option>
                {
                    data.map((cat) => (<option key={cat.id} value={cat.category}>{cat.category}</option>))
                }
            </select>
            <select  className='inputs' onChange={handleSubCatChange}>
                <option value=''>Select Subcategory</option>
                {
                    dat.map((cat, index) => (<option key={index} value={cat}>{cat}</option>))
                }
            </select>
            <input  className='inputs' type='text' style={{  }} placeholder='Author' value={sessionStorage.getItem('userName')} disabled />
            <input  className='inputs' type='number' style={{  }} placeholder='Price' onChange={(val) => setPrice(val.target.value)} required />
            <button className='signin' onClick={postData}>Submit</button>
        </div>
    )
}

export default AddBooks