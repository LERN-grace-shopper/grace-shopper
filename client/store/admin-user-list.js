import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADMIN_GET_ALL_USERS = 'ADMIN_GET_ALL_USERS'
const ADMIN_DELETE_USER = 'ADMIN_DELETE_USER'
const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultAdminUserList = []

/**
 * ACTION CREATORS
 */
const adminGetAllUsers = users => ({type: ADMIN_GET_ALL_USERS, users})
const adminDeleteUser = userId => ({type: ADMIN_DELETE_USER, userId})
const adminUpdateUser = updatedUser => ({
  type: ADMIN_UPDATE_USER,
  updatedUser
})

/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(adminGetAllUsers(users)))
      .catch(err => console.log(err))

export const deleteUserOnServer = userId =>
  dispatch =>
    axios.delete(`/api/users/${userId}`)
      .then(() => dispatch(adminDeleteUser(userId)))
      .catch(err => console.log(err))

export const updateUserOnServer = updatingUser =>
  dispatch =>
    axios.put(`/api/users/${updatingUser.id}`, updatingUser)
      .then(res => res.data)
      .then(updatedUser => dispatch(adminUpdateUser(updatedUser)))
      .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function (state = defaultAdminUserList, action) {
  switch (action.type) {

    case ADMIN_GET_ALL_USERS:
      return action.users

    case ADMIN_DELETE_USER:
      return state.users.filter(user => user.id !== action.userId)

    case ADMIN_UPDATE_USER:
      return state.users.map(user => (
        user.id === action.updatedUser.id
          ? action.updatedUser
          : user
      ))

    default:
      return state
  }
}
