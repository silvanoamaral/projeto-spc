import React, { Component } from 'react'
import { connect } from 'react-redux'

import register from '../../services/register'

import InputCustomized from '../../components/InputCustomized'
import Lightbox from '../../components/Lightbox'

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
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(e) {
    e.preventDefault()
    const { cpf, nome, valorDivida, dataInclusao} = this.state
    const data = {
      nome,
      cpf,
      valorDivida,
      dataInclusao
    }
    const { dispatch } = this.props
    dispatch(register.includeRegister(data))
  }

  render() {
    return (
      <div className="create__register box__form"> 
        <form onSubmit={ this.handleSubmit } className="form">
          <h2>Incluir</h2>

          <InputCustomized
            label="CPF"
            name="cpf"
            value={ this.state.cpf }
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
            value={ this.state.valorDivida }
            submitted={ this.state.submitted }
            placeholder="Valor da dívida em R$"
            onChange={ this.handleChange }
          />

          <InputCustomized
            label="Data de inclusão"
            name="dataInclusao"
            value={ this.state.dataInclusao }
            submitted={ this.state.submitted }
            placeholder="dd/mm/aaaa"
            onChange={ this.handleChange }
          />

          <div className="form__group">
            <button className="btn btn-primary">Adicionar entrada</button>
          </div>
        </form>
        <Lightbox
          title="Titulo "
          subTitle={`Deseja incluir o usuário ${this.state.nome }`}
        />
      </div>
    )
  }
}

export default connect()(CreateRegister)