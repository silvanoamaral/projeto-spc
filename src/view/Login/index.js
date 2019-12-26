import React from 'react'

import InputCustomized from '../../components/InputCustomized'

import './Login.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errorLogin: false,
      errorMessage: '',
      submitted: false,
      inputType: 'password'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  checkLoginStatus() {
    return localStorage.getItem('userLogin') != null
  }

  componentDidMount() {
    if(this.checkLoginStatus()) {
      this.props.history.push('/dashboard')
    } else {
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

  handleClick() {
    this.setState({ inputType: this.state.inputType === 'password' ? 'text' : 'password' })
  }

  handleSubmit(e) {
    e.preventDefault()

    const user = 'spcteste01@spcbrasil.org.br'
    const pass = '123456'

    this.setState({ submitted: true })

    const { username, password } = this.state

    if (username && password) {
      if(username.match(user) && password.match(pass)) {
        localStorage.setItem('userLogin', 1)
        this.props.history.push('/dashboard')
      } else {
        this.setState({
          errorMessage: 'Email ou senha incorretos. Favor verificar e tentar novamente',
          errorLogin: true
        })
      }
    }
  }

  render() {
    const { 
      username,
      password,
      submitted,
      errorLogin,
      errorMessage
    } = this.state

    return (
      <div className="login">
        {errorLogin &&
          <div className="message__error">
            { errorMessage }
          </div>
        }
        <form name="form" className="form" onSubmit={ this.handleSubmit }>
          <InputCustomized
            label="Usuário"
            name="username"            
            value={ username }
            submitted={ submitted }
            onChange={ this.handleChange }
          />

          <div className={'form__group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input 
              type={ this.state.inputType }
              name="password"
              value={ password }
              onChange={ this.handleChange }
              autoComplete="off"
            />
            {submitted && !password &&
              <div className="form__group-error">Password is required</div>
            }
            <button type="button" className="btn__eye" onClick={this.handleClick}>
              <svg viewBox="0 0 20 20" width="20px" height="20px">
                <g stroke="currentColor" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path d="M1.685 9.72C4.032 6.24 6.804 4.5 10 4.5c3.196 0 5.968 1.74 8.315 5.22h0a.5.5 0 010 .56C15.968 13.76 13.196 15.5 10 15.5c-3.196 0-5.968-1.74-8.315-5.22h0a.5.5 0 010-.56z" strokeLinejoin="round"></path>
                  <circle fillOpacity="0.3" fill="currentColor" cx="10" cy="10" r="3.5"></circle>
                </g>
              </svg>
            </button>
          </div>
          <div className="form__group">
            <button className="btn btn-primary">Entrar</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
