import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

import CreateRegister from './index'

let history
beforeEach(() => {
  history = { push: jest.fn() }
})

it('Mount renders CreateRegister component', () => {
  const resultMocks = {
    "data": [
      {
        "id": "18",
        "nome": "Jonny River",
        "cpf": "44447814080",
        "valordivida": 10291.82,
        "dataInclusao": "10/10/2019",
        "numeroContrato": 14573
      }
    ]
  }

  const dataMocks = { pending: false, filtered: resultMocks, toggleModal: false }

  const component = renderer.create(
    <StaticRouter location="/">
      <Provider store={store}>
        <CreateRegister registrationReducer={ dataMocks } history={ history } dispatch={ store.dispatch } />
      </Provider>
    </StaticRouter>
  )

  let tree = component.toJSON()
  /* const formElement = tree.find(element => element.type === 'form')
  assert.equal(formElement.type, 'form') */
})
