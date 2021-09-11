import React from 'react';

import './App.css';
import './Components/Aside.css'
import './Components/Footer.css'
import './Components/Header.css'
import './Components/Nav.css'
import './Components/Popup.css'
import './Pages/Main.css'
import './Components/Searcher.css'
import './Pages/MyPosts.css'
import './Components/ListaDePosts.css'
import './Pages/Category.css'
import './Pages/Settings.css'
import './Pages/Profile.css'
import './Pages/Post.css'

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
import Settings from './Pages/Settings'
import MyPosts from './Pages/MyPosts'
import AllUsers from './Pages/AllUsers'
import ByDates from './Pages/ByDates'
import Post from './Pages/Post'
import Support from './Pages/Support';
import Trending from './Pages/Trending'

import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [token, changeToken] = useState(localStorage.jwt)

  return (
    <div className='body'>
      <Router>
        <ScrollToTop />
        <Nav token= { token } changeToken= { changeToken } />
        <Header/>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/Forum'>
              {token && <Aside/>}
              <Forum />
            </Route>

            <Route exact path='/Post/:id'>
              {token && <Aside/>}
              <Post />
            </Route>

            <Route path='/Category'>
              {token && <Aside/>}
              <Category />
            </Route>

            <Route path='/Trending'>
              {token && <Aside/>}
              <Trending />
            </Route>
            

            <Route path='/Dates' >
              {token && <Aside/>}
              <ByDates />
            </Route>

            <Route path='/Login'>
              <Login changeToken= { changeToken }/>
            </Route>

            <Route path='/Register'>
              <Register />
            </Route>

            <Route path='/Comunity'>
              {token  && <Comunity />}
              {token && <Aside />}
            </Route>

            <Route path='/AllUsers'>
              {token && <AllUsers />}
              {token && <Aside />}
            </Route>

            <Route path='/Profile'>
              {token  && <Profile />} 
              {token && <Aside />}
            </Route>

            <Route path='/Settings'>
            {token  && <Settings />}
            {token && <Aside />}
            </Route>

            <Route path='/MyPosts'>
              {token && <MyPosts />}
              {token && <Aside />}
            </Route>

            <Route path='/Support'>
              {token && <Support />}
              {token && <Aside />}
            </Route>

            <Route path='/Contact'>
              <Contact />
            </Route>

            <Route path='/AboutUs'>
              <AboutUs />
            </Route>

          </Switch>
          <ScrollToTop />
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
