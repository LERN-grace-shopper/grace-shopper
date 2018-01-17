// ADMIN ONLY!

import React from 'react'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchAllUsers, deleteUserOnServer, updateUserOnServer} from '../store'

const yellAtHackers = () => {
  alert("stop pressing buttons!! you shouldn't even be viewing this page!")
}

const AllUsers = props => {
  const {isAdmin, allUsers, handleUserDeleteClick, handleUserToggleAdminClick} = props

  return (!isAdmin ? 'how are you seeing this page, hacker?' : (
  <li>
    {allUsers && allUsers.map(user => (
      <ul key={user.id}>
        User ID: {user.id}
        <br />
        Email: {user.email}
        <br />
        {/* Google ID: {user.googleId} // Problem: this information is not retrieved from server
        Admin? {user.isAdmin} */}
        { // can't delete your own account
          user.id !== props.yourId &&
          <button onClick={
            isAdmin ? handleUserDeleteClick(user.id) : yellAtHackers
          }> Delete user </button>
        }
        <br />
        { // can't toggle your own admin status
          user.id !== props.yourId &&
          <button onClick={handleUserToggleAdminClick(user.id)}> Toggle admin status </button>
        }
      </ul>
    ))}
  </li>
))}

const mapState = state => ({
  allUsers: state.adminUserList,
  isAdmin: state.user.isAdmin,
  yourId: state.user.id
})


// admin validation within these functions has been commented out due to bugginess
const mapDispatch = (dispatch, /*ownProps*/) => {
  dispatch(fetchAllUsers())
  return {
    handleUserDeleteClick (userId) {
      return function() {
        // if (ownProps.isAdmin) {
          dispatch(deleteUserOnServer(userId))
        // }
        // else {yellAtHackers()}
      }
    },
    handleUserToggleAdminClick (userId) {
      return function() {
        // if (ownProps.isAdmin) {
          const updatingUser = ownProps.allUsers.find(user => user.id === userId)
          dispatch(updateUserOnServer({
            ...updatingUser,
            isAdmin: !updatingUser.isAdmin
          }))
        // }
        // else {yellAtHackers()}
      }
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllUsers))
