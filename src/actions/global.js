import { makeActionCreator } from 'utils/common'
import constants from 'constants/actionTypes'

export const setUserLoggedIn = makeActionCreator(constants.SET_USER_LOGGED_IN, 'payload')
export const setSelectedUser = makeActionCreator(constants.SET_SECECTED_USER, 'payload')
export const setUsers = makeActionCreator(constants.SET_USERS, 'payload')