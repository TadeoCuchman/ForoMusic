import React from 'react';
import './App.css';

import ScrollToTop from './Components/ScrollToTop';
import Nav from './Components/Nav'
import Aside from './Components/Aside';
import Header from './Components/Header';
import Footer from './Components/Footer';


import Home from './Pages/Home'
import Forum from './Pages/Forum'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Category from './Pages/Category';
import Comunity from './Pages/Comunity';
import Profile from './Pages/Profile';
import AboutUs from './Pages/AboutUs'
import Contact from './Pages/Contact';

import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [token, changeToken] = useState(localStorage.jwt)

  return (
    <div className='body'>
      <Router>
        <ScrollToTop />
        <Nav token= { token } changeToken= { changeToken } />
        <Aside/>
        <Header/>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/Forum'>
              <Forum />
            </Route>
            <Route path='/Category'>
              <Category />
            </Route>
            <Route path='/Login'>
              <Login changeToken= { changeToken }/>
            </Route>
            <Route path='/Register'>
              <Register />
            </Route>
            <Route path='/Comunity'>
              <Comunity />
            </Route>
            <Route path='/Profile'>
              <Profile />     
            </Route>
            <Route path='/Contact'>
              <Contact />
            </Route>
            <Route path='/AboutUs'>
              <AboutUs />
            </Route>
          </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
