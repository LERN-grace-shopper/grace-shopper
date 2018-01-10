import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Cart = props => (
  <div>
    <h1>Cart goes here</h1>
  </div>
)


const mapState = state => ({

})

const mapDispatch = dispatch => ({

})

export default withRouter(connect(mapState, mapDispatch)(Cart))
