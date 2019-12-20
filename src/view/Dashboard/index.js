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
                    <button className="btn editor"><i class='fas fa-pen'></i>Editar</button>
                    <button className="btn delete"><i class='fas fa-trash-alt'></i>Deletar</button>
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