import constants, { LOGIN } from 'constants/actionTypes'

function auth(state = {
  userData: null
}, action) {
  const { payload, type } = action
  switch (type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        userData: payload
      }
    case constants.LOGOUT:
      return {
        ...state,
        userData: null
      }
    default:
      return state
  }
}

export default auth
