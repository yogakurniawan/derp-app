import { combineReducers } from 'redux'

import global from './global'
import auth from './auth'
import loading from './loadingReducer'
import error from './errorReducer'

export default combineReducers({
  global,
  auth,
  loading,
  error
})
