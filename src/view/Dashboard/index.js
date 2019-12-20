import React, { Component } from 'react'
import { connect } from 'react-redux'

import register from '../../services/register'
import SearchBar from '../../components/SearchBar'

import './Dashboard.scss'

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

  removeRegister(id) {
    const { dispatch } = this.props
    dispatch(register.removeRegister(id))
  }

  render() {
    const { pending, filtered } = this.props.registrationReducer

    return <>
      <SearchBar />
      {pending ?
        <h2>Aguarde...</h2>
      : (filtered && filtered.data &&
        (filtered.data.length ?
          <ul className="dashboard">
            <li>
              <span>cpf</span>
              <span>nome</span>
              <span>valor da dívida</span>
              <span>data da Inclusão</span>
              <span>Nº do contrato</span>
              <span></span>
            </li>
          {
            filtered.data.map(item => {
              return <li key={ item.id }>
                <span>{ item.cpf }</span>
                <span>{ item.nome }</span>
                <span>{ item.valordivida }</span>
                <span>{ item.dataInclusao }</span>
                <span>{ item.numeroContrato }</span>
                <span className="action">
                  <div className="action__icons">
                    <button
                      className="btn editor"
                      data-id={ item.id }
                      onClick={ () =>this.props.dispatch({ type:'EDIT__REGISTER', id:item.id }) }
                    >
                      <i className='fas fa-pen'></i>Editar
                    </button>
                    <button
                      className="btn remove"
                      data-id={ item.id }
                      onClick={ () => this.removeRegister(item.id) }
                    >
                      <i className='fas fa-trash-alt'></i>Deletar
                    </button>
                  </div>
                </span>
              </li>
            })
          }
          </ul>
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