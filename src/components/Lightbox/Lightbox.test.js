import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

import Lightbox from './index'

const funcMocks = () => {
  return null
}

it('Mount renders Lightbox component', () => {
  const dataMocks = { title: 'Teste', subTitle: 'Teste', dispatch: funcMocks, onClick: funcMocks, pending: true }
  const wrapper = mount(
    <Provider store={store}>
      <Lightbox data={ dataMocks } />
    </Provider>
  )

  expect(wrapper.find('div')).toHaveLength(4)

  const buttonNao = wrapper.find('button').at(0)
  buttonNao.prop('onClick')('test2')
})