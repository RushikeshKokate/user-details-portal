import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './Components/store';
import Signup from './Components/auth/Signup/index';
import Login from '../src/Components/auth/login/index';
import Home from './Components/home/index';
import './App.css';
import Header from './Components/header/index';
import UserForm from '../src/Components/userForm/index';
import { auth } from './firebase';
import Success from "./Components/Success/index"

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <Provider store={store}>
    
        <div className="App">
          <Header name={userName} />
          <Routes>
            <Route path="/" element={<Home name={userName}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Success" element={<Success/>} />
            <Route path="/userForm" element={<UserForm />} />
          </Routes>
        </div>
  
    </Provider>
  );
}

export default App;
