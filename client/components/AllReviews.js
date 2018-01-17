import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchReviewsByProductId} from '../store'

const AllReviews = (props) => {

    return (
        <div>
            <h5>Reviews</h5>
            {props.reviews && props.reviews.map(review => {
                return (
                    <div key={review.id}>
                        <h6>{review.title}</h6>
                            <br />
                        <h6>{review.content}</h6>
                            <br />
                        <div>Rating: {review.rating}</div>
                    </div>
                )
            })}
        </div>
    )

}

const mapState = (state) => ({
  reviews: state.review.reviews,
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchReviewsByProductId(ownProps.match.params.productId))

  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllReviews))
