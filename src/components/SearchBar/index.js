import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import mask from '../../utils/mask'
import { searchRegister } from '../../redux/actions'
import './SearchBar.scss'

class SearchBar extends Component {
  render() {
    const { searchRegister, value } = this.props

    return (
      <header>
        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Filtrar pelo CPF"
            onChange={ e => searchRegister(mask.cpfMask(e.target.value)) }
            value={ value || '' }
          />
        </div>
        <div className="btn__link">
          <Link to="/register">Adicionar</Link>
        </div>
      </header>
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