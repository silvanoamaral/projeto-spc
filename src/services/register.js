import axios from 'axios'

import {
  fetchRegisterPending,
  fetchRegisterSuccess,
  fetchRegisterError,
} from '../redux/actions'

const getRegister = (id = '') => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.get(`/api/registro/`, { params: { id: id } })
    .then(response => {
      dispatch(fetchRegisterSuccess(response.data))
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

const updateRegister = (id = 0, params, history) => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.put(`http://5d52bcb73432e70014e6bc2c.mockapi.io/spc/registro/${id}`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      dispatch({ type: 'TOGGLE_MODAL_CLOSE' })
      history.push("/dashboard")
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
      dispatch({ type: 'TOGGLE_MODAL_CLOSE' })
      dispatch(getRegister())
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

const includeRegister = (params, history) => {
  return dispatch => {
    dispatch(fetchRegisterPending())

    axios.post(`http://5d52bcb73432e70014e6bc2c.mockapi.io/spc/registro/`, params, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      dispatch({ type: 'TOGGLE_MODAL_CLOSE' })
      history.push("/dashboard")
    })
    .catch((error) => {
      dispatch(fetchRegisterError(error))
    })
  }
}

export default {
  getRegister,
  includeRegister,
  updateRegister,
  removeRegister
}