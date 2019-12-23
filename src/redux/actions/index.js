import {
  FETCH_REGISTRATION_ERROR,
  FETCH_REGISTRATION_PENDING,
  FETCH_REGISTRATION_SUCCESS,
  FETCH_REGISTRATION_SEARCH
} from '../actions/actionTypes'

export const fetchRegisterPending = () => ({
  type: FETCH_REGISTRATION_PENDING,
})

export const fetchRegisterSuccess = registration => ({
  type: FETCH_REGISTRATION_SUCCESS,
  registration,
})

export const fetchRegisterError = error => ({
  type: FETCH_REGISTRATION_ERROR,
  error,
})

export const searchRegister = value => ({
  type: FETCH_REGISTRATION_SEARCH,
  value,
})