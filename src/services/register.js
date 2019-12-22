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

    axios.delete(`http://5d52bcb73432e70014e6bc2c.mockapi.io/spc/registro/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      dispatch(getRegister())
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

const includeRegister = (params) => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.post(`http://5d52bcb73432e70014e6bc2c.mockapi.io/spc/registro/`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 201) {
        console.log('Sucess', response)
        return true
      }
      console.log('Error:.', response)
      return false
      //dispatch(getRegister())
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

export default {
  getRegister,
  includeRegister,
  removeRegister
}