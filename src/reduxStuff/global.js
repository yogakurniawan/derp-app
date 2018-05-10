import constants from 'constants/actionTypes'

function global(state = {
  users: null,
  userLoggedIn: false,
  selectedUser: null
}, action) {
  const { payload, type } = action
  switch (type) {
    case constants.SET_USER_LOGGED_IN:
      return {
        ...state,
        userLoggedIn: payload
      }
    case constants.SET_USERS:
      return {
        ...state,
        users: payload
      } 
    case constants.SET_SECECTED_USER:
      return {
        ...state,
        selectedUser: payload
      } 
    default:
      return state
  }
}

export default global
