import React from 'react'
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([thunk])
const store = mockStore({})

import Dashboard from './index'

let history
beforeEach(() => {
  history = { push: jest.fn() }
})

it('Mount renders Dashboard component', () => {
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
        <Dashboard registrationReducer={ dataMocks } history={ history } dispatch={ store.dispatch } />
      </Provider>
    </StaticRouter>
  ).root

  const element = component.findByType('div')
  expect(element.props.className.includes('dashboard')).toBe(true)


/*   const wrapper = shallow(<Dashboard store={store} registrationReducer={ dataMocks } history={ history } dispatch={ store.dispatch } />)
  const element = wrapper.dive() */


  //const button = component.find('button')
  //console.log(component)
  //expect(button).to.have.lengthOf(1)
  //button.simulate('click')


  /* const div = document.createElement('div')
  ReactDOM.render(<Dashboard />, div)
  ReactDOM.unmountComponentAtNode(div) */

  
/* 
expect(wrapper.find('div')).toHaveLength(4)
  const buttonNao = wrapper.find('button').at(0)
  buttonNao.prop('onClick')('test2') */
})
