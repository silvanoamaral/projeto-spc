import React, { Component } from 'react'
import axios from 'axios'

class Dashboard extends Component {
  checkLoginStatus() {
    return localStorage.getItem('userLogin') != null
  }

  componentDidMount() {
    if(!this.checkLoginStatus()) {
      this.props.history.push("/")
    }
    axios.get(`/api/registro/`)
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    return <h1>Dashboard</h1>
  }
}

export default Dashboard