import React from 'react'
import { mount } from 'enzyme'

import Login from './index'

let history
beforeEach(() => {
  history = { push: jest.fn() }
})

const credentials = { username: 'spcteste01@spcbrasil.org.br', password: '123456' }
const fakeEvent = { preventDefault: () => '' }

describe('Login Page', () => {
  it('Submit Form Fake News', () => {
    const component = mount(<Login history={ history } submitted={ false } />)
    const form = component.find('form')
    form.simulate('submit', fakeEvent)
    expect(component.find('.form__group.has-error').length).toBe(2)
  })

  it('Check value input', () => {
    const component = mount(<Login history={ history } />)

    const username = component.find('input[name="username"]')
    username.value = credentials.username
    username.simulate('change')
    expect(username.value).toBe('spcteste01@spcbrasil.org.br')

    const password = component.find('input[name="password"]')
    password.value = credentials.password
    password.simulate('change')
    expect(password.value).toBe('123456')

    const form = component.find('form')
    form.simulate('submit')
  })

  it('Click button', () => {
    const component = mount(<Login history={ history } />)
    const button = component.find('.btn__eye')
    expect(button.length).toBe(1)
    button.simulate('click')
  })
})