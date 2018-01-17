import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const {children, handleClick, userId, isLoggedIn, isAdmin} = props


  return (
    <div>
      <h1 id="shop-name">CRYSTALS</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">{isAdmin ? 'Admin' : 'Home'}</Link>
              <Link to={`/orders/users/${userId}`}>My Orders</Link>
              {
                isAdmin && (
                  <div>
                    <Link to="/data-visualization">Data Visualization</Link>
                    <Link to="/users"> All users </Link>
                    <Link to="/orders/all-orders"> All orders </Link>
                    <Link to="/products/add/new-product"> Add product </Link>
                  </div>
                )
              }
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
        <Link to="/products">Products</Link>
        <Link to={`/cart/${userId}`}>Cart</Link>
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,

    userId: state.user.id

  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
