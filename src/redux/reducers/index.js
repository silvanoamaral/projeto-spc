import { combineReducers } from 'redux'

import { registrationReducer } from './registrationReducer'

const rootReducer = combineReducers({
  registrationReducer,
})

export default rootReducer