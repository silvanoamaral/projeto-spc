import React from 'react'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

import SearchBar from './index'

it('Mount renders SearchBar component', () => {
  const component = renderer.create(
    <StaticRouter location="/">
      <Provider store={store}>
        <SearchBar />
      </Provider>
    </StaticRouter>
  )
})