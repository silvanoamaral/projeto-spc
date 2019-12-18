import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from '../view/Login'
import Dashboard from '../view/Dashboard'

class App extends Component { 
  render() {
    return (
      <>
        <Router>
          <Route path="/" exact component={ Login } />
          <Route path="/dashboard" component={ Dashboard } />
        </Router>
      </>
    )
  }
}

export default App