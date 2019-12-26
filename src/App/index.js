import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from '../view/Login'
import Dashboard from '../view/Dashboard'
import CreateRegister from '../view/CreateRegister'
import EditRegister from '../view/EditRegister'
import Header from '../components/Header'
import Footer from '../components/Footer'

import '../assets/style/index.scss'

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Router>
          <Route path="/" exact component={ Login } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/register" component={ CreateRegister } />
          <Route path="/edit-register" component={ EditRegister } />
        </Router>
        <Footer />
      </>
    )
  }
}

export default App