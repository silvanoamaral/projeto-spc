import React, { Component } from 'react'
import { connect } from 'react-redux'

import getRegister from '../../services/register'
import InputCustomized from '../../components/InputCustomized'
import Lightbox from '../../components/Lightbox'
import ButtonForm from '../../components/ButtonForm'
import mask from '../../utils/mask'

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
      dataRegister: {},
      condition: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate() {
    const { pending, filtered } = this.props.registrationReducer

    if(!pending) {
      if(filtered != undefined) {
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
  }

  componentDidMount() {
    if(this.props.location.state === undefined) {
      this.props.history.push("/dashboard")
    } else {
      const { register } = this.props.location.state

      this.setState({
        idRegister: register
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
    this.setState({
      dataRegister: data
    })

    const { dispatch } = this.props
    dispatch({ type: 'TOGGLE_MODAL_OPEN' })
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(getRegister.updateRegister(this.state.idRegister, this.state.dataRegister, this.props.history))
  }

  render() {
    const { toggleModal, pending } = this.props.registrationReducer

    return <div className="create__register box__form">
      <form onSubmit={ this.handleSubmit } className="form">
        <h2>Editar</h2>
        {pending &&
          <p>Aguarde...</p>
        }
        <InputCustomized
          label="CPF"
          name="cpf"
          value={ mask.cpfMask(this.state.cpf) }
          maxLength='14'
          submitted={ this.state.submitted }
          placeholder="CPF"
          onChange={ this.handleChange }
          active={ true }
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
          maxLength='6'
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

        <ButtonForm label="Adicionar entrada" />
      </form>
      {toggleModal &&
        <Lightbox
          title="Titulo"
          subTitle={`Deseja alterar o registro ${this.state.nome }`}
          dataRegister={ this.state.dataRegister }
          onClick={ this.handleClick }
          pending={ pending }
        />
      }
    </div>
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(EditRegister)