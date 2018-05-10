import constants, { LOGIN } from 'constants/actionTypes'
import { makeActionCreator } from 'utils/common'

export const setUserData = makeActionCreator(LOGIN.SUCCESS, 'payload')
export const setLoginError = makeActionCreator(LOGIN.FAILURE, 'error')
export const logout = makeActionCreator(constants.LOGOUT)
