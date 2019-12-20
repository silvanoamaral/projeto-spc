import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchRegister } from '../../redux/actions'
import './SearchBar.scss'

class SearchBar extends Component {
  render() {
    const { searchRegister, value } = this.props

    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Filtrar pelo CPF"
          onChange={ e => searchRegister(e.target.value) }
          value={ value }
        />
      </div>
    )
  }
}

const mapStateToProps = ({ registrationReducer }) => {
  return {
    value: registrationReducer !== undefined ? registrationReducer.value : '',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchRegister }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)