import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getAllProducts} from '../store'

const mapState = state => ({
  ...state
})

const mapDispatch = dispatch => ({
  
})

const DataVisualization = props => (
  <div>
    
  </div>
)

export default withRouter(connect(mapState, mapDispatch)(DataVisualization))