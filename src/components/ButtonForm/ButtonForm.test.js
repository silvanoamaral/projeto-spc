import React from 'react'
import ReactDOM from 'react-dom'
import ButtonForm from './index'

it('renders ButtonForm', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ButtonForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})