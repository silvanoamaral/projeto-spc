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
      console.log(error)
    })
  }
}

export default {
  getRegister,
}