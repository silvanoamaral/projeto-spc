import {
  FETCH_REGISTRATION_ERROR,
  FETCH_REGISTRATION_PENDING,
  FETCH_REGISTRATION_SUCCESS,
  FETCH_REGISTRATION_SEARCH,
} from '../actions/actionTypes'

const initialState = {
  pending: false,
  registration: [],
  filtered: [],
  filters: [],
  value: '',
  option: '',
  error: null,
}
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTRATION_SUCCESS:
      return {
        ...state,
        pending: false,
        registration: action.registration,
        filtered: action.registration,
        filters: action.registration.filters
      }
    case FETCH_REGISTRATION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      }
    case FETCH_REGISTRATION_PENDING:
      return {
        ...state,
        pending: true,
        registration: [],
      }
    case FETCH_REGISTRATION_SEARCH: {
      const value = action.value

      return {
        ...state,
        value,
        filtered: {
          "data" : state.registration.data.filter(item => {
            const lc = item.cpf.toLowerCase()
            const filter = value.toLowerCase()
            return lc.includes(filter)
          })
        }
      }
    }
    default:
      return state
  }
}