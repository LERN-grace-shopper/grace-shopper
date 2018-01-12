import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchReviewsByProductId} from '../store'

const AllReviews = (props) => {
  console.log("props reviews", props.reviews)
    return (
        <li>
          {props.reviews && props.reviews.map(review => (
            <ul key={review.id}>
                <img src={product.photoUrl} alt="product photoUrl loading fail" />
                <h6>{review.title}</h6>
            </ul>
          ))}
        </li>
      )
}

const mapState = (state) => ({
  reviews: state.review.reviews
})

const mapDispatch = (dispatch) => {
  dispatch(fetchReviewsByProductId())
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllReviews))
