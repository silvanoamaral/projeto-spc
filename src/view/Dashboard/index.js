import React, { Component } from 'react'
import { connect } from 'react-redux'

import register from '../../services/register'
import SearchBar from '../../components/SearchBar'

class Dashboard extends Component {
  checkLoginStatus() {
    return localStorage.getItem('userLogin') != null
  }

  componentDidMount() {  
    if(!this.checkLoginStatus()) {
      this.props.history.push("/")
    }

    const { dispatch } = this.props
    dispatch(register.getRegister())
  }

  render() {
    const { pending, filtered } = this.props.registrationReducer

    return <>
      <SearchBar />
      {pending ?
        <h2>Aguarde...</h2>
      : (filtered && filtered.data &&
        (filtered.data.length ? 
          filtered.data.map(item => {
            return <p key={ item.id }>{ item.cpf }</p>
          })
          :
          <p>Not Found</p>
        )
      )}
    </>
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Dashboard)