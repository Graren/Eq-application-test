import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  imageRequest: ['path'],
  imageSuccess: ['path'],
  imageFailure: ['error'],
  logout: null
})

export const ImageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  path: null,
  error: null,
  saving: false
})

/* ------------- Reducers ------------- */

// we're attempting to image
export const request = (state) => state.merge({ saving: true })

// we've successfully logged in
export const success = (state, { path }) =>
  state.merge({ saving: false, error: null, path })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ saving: false, error })

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.IMAGE_REQUEST]: request,
  [Types.IMAGE_SUCCESS]: success,
  [Types.IMAGE_FAILURE]: failure
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
