import axios from 'axios'

import {
  fetchRegisterPending,
  fetchRegisterSuccess,
  fetchRegisterError,
} from '../redux/actions'

const getRegister = () => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.get(`/api/registro/`)
    .then(response => {
      dispatch(fetchRegisterSuccess(response.data))
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

const removeRegister = (id = 0) => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.get(`/api/remove?id=${ id }`)
    .then(() => {
      dispatch(getRegister())
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

export default {
  getRegister,
  removeRegister
}