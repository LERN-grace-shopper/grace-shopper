import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchAllProducts, fetchReviewsForAllProducts, fetchAllUsers} from '../store'

const mapState = state => ({
  ...state
})

const mapDispatch = dispatch => {
  dispatch(fetchAllProducts())
  dispatch(fetchReviewsForAllProducts())
  dispatch(fetchAllUsers())
  return {}
}

// includes min, excludes max
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max - min))

const DataVisualization = props => {
  const numUsers = props.adminUserList.length
  const numProducts = props.product.allProducts.length
  const numReviews = props.review.allReviews.length
  const crystalEmojis = ['💎', '🔮', '🔶', '🔷']

  return (
    <div>
      <div>This site has {numUsers} users.</div>
      <div>{'😊'.repeat(numUsers)}</div>
      <div>
        This site has {numProducts} products
        with {numReviews} reviews.
      </div>
      <div>{[...Array(numProducts)].map(product => crystalEmojis[randomInteger(0, crystalEmojis.length)])}</div>
    </div>
  )
}

export default withRouter(connect(mapState, mapDispatch)(DataVisualization))