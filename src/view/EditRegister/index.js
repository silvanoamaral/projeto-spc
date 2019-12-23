import React, { Component } from 'react'
import { connect } from 'react-redux'

import getRegister from '../../services/register'

import InputCustomized from '../../components/InputCustomized'

class EditRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      idRegister: '',
      cpf: '',
      nome: '',
      valorDivida: '',
      dataInclusao: '',
      errorLogin: false,
      errorMessage: '',
      submitted: false,
      register: '',
      condition: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    const { pending, filtered } = this.props.registrationReducer

    if(!pending) {
      if(filtered.data != undefined) {
        if (this.state.condition) {
          this.setState({
            condition: false,
            idRegister: filtered.data.id,
            cpf: filtered.data.cpf,
            nome: filtered.data.nome,
            valorDivida: filtered.data.valorDivida || filtered.data.valordivida,
            dataInclusao: filtered.data.dataInclusao,
          })
        }
      }
    }
  }

  componentDidMount() {
    if(this.props.location.state === undefined) {
      this.props.history.push("/dashboard")
    } else {
      const { register } = this.props.location.state

      this.setState({
        register
      })
      const { dispatch } = this.props
      dispatch(getRegister.getRegister(register))
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
    dispatch(getRegister.updateRegister(this.state.idRegister, data))
  }

  render() {
    const { register } = this.state
    const { pending, filtered } = this.props.registrationReducer

    return <>
    {pending ?
      <h2>Aguarde...</h2>
    : (filtered &&
        (filtered.data ?         
          <div className="create__register box__form">
            <form onSubmit={ this.handleSubmit } className="form">
              <h2>Editar</h2>

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
          </div>
          :
          <p>Not Found</p>
        )
      )
    }
    </>
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(EditRegister)