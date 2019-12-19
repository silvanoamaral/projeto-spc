import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { search } from '../../redux/actions'
import './SearchBar.scss'

class SearchBar extends Component {
  render() {
    const { search, value } = this.props

    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Filtrar pelo CPF"
          onChange={ e => search(e.target.value) }
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
  return bindActionCreators({ search }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)