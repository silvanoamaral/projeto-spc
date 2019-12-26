import React, { Component } from 'react'
import { connect } from 'react-redux'

import register from '../../services/register'

import InputCustomized from '../../components/InputCustomized'
import Lightbox from '../../components/Lightbox'
import mask from '../../utils/mask'

import './CreateRegister.scss'

class CreateRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cpf: '',
      nome: '',
      valorDivida: '',
      dataInclusao: '',
      errorLogin: false,
      errorMessage: '',
      submitted: false,
      dataRegister: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  checkLoginStatus() {
    return localStorage.getItem('userLogin') != null
  }

  componentDidMount() {
    if(!this.checkLoginStatus()) {
      this.props.history.push('/')
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })

    this.setState({
      errorMessage: '',
      errorLogin: false
    })
  }

  isNoSubmitForm() {
    const isValidName = this.state.nome.length > 5
    const isValidCPF =  this.state.cpf.length > 12

    if(isValidCPF && isValidName) {
      return true
    }
    return false
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ submitted: true })

    if(this.isNoSubmitForm()) {
      const { cpf, nome, valorDivida, dataInclusao } = this.state
      const data = {
        nome,
        cpf,
        valorDivida,
        dataInclusao
      }

      this.setState({
        dataRegister: data
      })

      const { dispatch } = this.props
      dispatch({ type: 'TOGGLE_MODAL_OPEN' })
    } else {
      console.error('preencher os campos')
    }
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(register.includeRegister(this.state.dataRegister, this.props.history))
  }

  render() {
    const { toggleModal } = this.props.registrationReducer

    return (
      <div className="create__register box__form"> 
        <form onSubmit={ this.handleSubmit } className="form">
          <h2>Incluir</h2>

          <InputCustomized
            label="CPF"
            name="cpf"
            value={ mask.cpfMask(this.state.cpf) }
            maxLength='14'
            submitted={ this.state.submitted }
            placeholder="CPF"
            onChange={ this.handleChange }
          />

          <InputCustomized
            label="Nome"
            name="nome"
            value={ this.state.nome }
            submitted={ this.state.submitted }
            placeholder="Nome completo"
            onChange={ this.handleChange }
          />

          <InputCustomized
            label="Valor da dívida"
            name="valorDivida"
            value={ mask.priceMask(this.state.valorDivida) }
            maxLength='10'
            submitted={ this.state.submitted }
            placeholder="Valor da dívida em R$"
            onChange={ this.handleChange }
          />

          <InputCustomized
            label="Data de inclusão"
            name="dataInclusao"
            value={ mask.dateMask(this.state.dataInclusao) }
            maxLength='10'
            submitted={ this.state.submitted }
            placeholder="dd/mm/aaaa"
            onChange={ this.handleChange }
          />

          <div className="form__group">
            <button className="btn btn-primary">Adicionar entrada</button>
          </div>
        </form>
        {toggleModal &&
          <Lightbox
            title="Titulo"
            subTitle={`Deseja incluir o usuário ${this.state.nome }`}
            dataRegister={ this.state.dataRegister }
            onClick={ this.handleClick }
            pending={ pending }
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(CreateRegister)