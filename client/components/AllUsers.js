// ADMIN ONLY!

import React from 'react'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchAllUsers, deleteUserOnServer, updateUserOnServer} from '../store'

const AllUsers = props => {
  const allUsers = props.allUsers

  return (!props.isAdmin ? 'how are you seeing this page, hacker?' : (
  <li>
    {console.log(allUsers)}
    {allUsers && allUsers.map(user => (
      <ul key={user.id}>
        User ID: {user.id}
        <br />
        Email: {user.email}
        <br />
        {/* Google ID: {user.googleId} // Problem: this information is not retrieved from server
        Admin? {user.isAdmin} */}
        <button> Delete user </button>
        <br />
        <button> Toggle admin status </button>
      </ul>
    ))}
  </li>
))}

const mapState = state => ({
  allUsers: state.adminUserList,
  isAdmin: state.user.isAdmin
})

const yellAtHackers = () => {
  alert("stop pressing buttons!! you shouldn't even be viewing this page!")
}

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchAllUsers())
  return {
    handleUserDeleteClick (userId) {
      return function() {
        if (ownProps.isAdmin) dispatch(deleteUserOnServer(userId))
        else {yellAtHackers()}
      }
    },
    handleUserToggleAdminClick (userId) {
      return function() {
        if (ownProps.isAdmin) {
          const updatingUser = ownProps.allUsers.find(user => user.id === userId)
          dispatch(updateUserOnServer({
            ...updatingUser,
            isAdmin: !updatingUser.isAdmin
          }))
        }
        else yellAtHackers()
      }
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllUsers))
