import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import { store } from './redux/store';

//Style
import './App.css';

//Screens
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import Home from './screens/Home';
import AddBooks from './screens/AddBooks';
import { Provider } from 'react-redux';

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Signin />} ></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/addBook" element={<AddBooks />} ></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
