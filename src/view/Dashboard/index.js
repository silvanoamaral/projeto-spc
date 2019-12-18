import React, { Component } from 'react'

class Dashboard extends Component {
  checkLoginStatus() {
    return localStorage.getItem('userLogin') != null
  }

  componentDidMount() {
    if(!this.checkLoginStatus()) {
      this.props.history.push("/")
    }
  }

  render() {
    return <h1>Dashboard</h1>
  }
}

export default Dashboard