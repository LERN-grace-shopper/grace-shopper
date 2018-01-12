import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchReviewsByProductId} from '../store'

const AllReviews = (props) => {
    console.log('PROPS IN ALL REVIEWS', props)
    return (
        <div>
            <h2>Reviews</h2>
            {props.reviews && props.reviews.map(review => {
                return (
                    <div key={review.id}>
                    <h4>{review.title}</h4>
                    <h5>{review.content}</h5>
                    Rating: {review.rating}
                    </div>
                )
            })}
        </div>
    )
}

const mapState = (state) => ({
  reviews: state.review.reviews
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchReviewsByProductId(ownProps.match.params.productId))
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllReviews))
