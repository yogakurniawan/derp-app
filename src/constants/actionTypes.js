import { createActionTypes, createConstants } from 'utils/common'

export const LOGIN = createActionTypes('LOGIN')

export default createConstants(
  'SET_USER_LOGGED_IN',
  'SET_SECECTED_USER',
  'SET_USERS',
  'LOGOUT',
  'ADMIN',
  'MEMBER',
  'MANAGER'
)

export const userSeed = [
  {
    username: 'admin',
    password: 'Admin@12345',
    type: 'ADMIN'
  },
  {
    username: 'manager',
    password: 'Manager@12345',
    type: 'MANAGER'
  },
  {
    username: 'user1',
    password: 'User1@12345',
    type: 'MEMBER'
  }
]