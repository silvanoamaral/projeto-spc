import React, { Component } from 'react'
import { connect } from 'react-redux'

import register from '../../services/register'
import SearchBar from '../../components/SearchBar'
import Lightbox from '../../components/Lightbox'
import mask from '../../utils/mask'

import './Dashboard.scss'

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nome: '',
      idRegister: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

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

  handleClick() {
    this.props.dispatch(register.removeRegister(this.state.idRegister))
  }

  handleClickOpenDelete(event) {
    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_MODAL_OPEN' })

    this.setState({
      nome: event.target.getAttribute('data-name'),
      idRegister: event.target.getAttribute('data-id')
    })
  }

  render() {
    const { pending, filtered, toggleModal } = this.props.registrationReducer

    return <div className="container dashboard">
      <SearchBar />
      {pending ?
        <h2>Aguarde...</h2>
      : (filtered && filtered.data &&
        (filtered.data.length ?
          <>
          <ul className="dashboard__list">
            <li>
              <span>CPF</span>
              <span>Nome</span>
              <span>Valor da dívida</span>
              <span>Data da Inclusão</span>
              <span>Nº do contrato</span>
            </li>
          {
            filtered.data.map(item => {
              return <li key={ item.id }>
                <span>{ mask.cpfMask(item.cpf) }</span>
                <span>{ item.nome }</span>
                <span>R${ item.valorDivida || item.valordivida }</span>
                <span>{ item.dataInclusao }</span>
                <span>{ item.numeroContrato }</span>
                <span className="action">
                  <div className="action__icons">
                    <button
                      className="btn editor"
                      data-id={ item.id }
                      onClick={ () =>
                        this.props.history.push({
                          pathname: `/edit-register`,
                          state: { register: item.id }
                        })
                      }
                    >
                      <i className='fas fa-pen'></i>Editar
                    </button>
                    <button
                      className="btn remove"
                      data-id={ item.id }
                      data-name={ item.nome }
                      onClick={ event => this.handleClickOpenDelete(event) }
                    >
                      <i className='fas fa-trash-alt'></i>Deletar
                    </button>
                  </div>
                </span>
              </li>
            })
          }          
          </ul>
          {toggleModal &&
            <Lightbox
              title="Titulo"
              subTitle={`Deseja excluir o usuário ${this.state.nome }`}
              dataRegister={ this.state.dataRegister }
              onClick={ this.handleClick }
              pending={ pending }
            />
          }
          </>
          :
          <p>Not Found</p>
        )
      )}
    </div>
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(Dashboard)