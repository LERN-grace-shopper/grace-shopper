import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {composeReview, submitReview} from '../store/review-form'

const LeaveReview = (props) => {
  const {title, content, rating, handleChange, handleSubmit} = props

  return (
    <div>
      <form id="submit-review">
        <div>Subject:
          <input
            label="Title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>What did you think of this product?
          <input
            type="text"
            label="Content"
            value={content}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>Rating (1-5): 
          <input
            label="Rating"
            value={rating}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="Submit" onClick={handleSubmit}>Submit Review</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleChange (event) {

    },
    handleSubmit (event) {
      event.preventDefault()
      dispatch(submitReview(/* Review */))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(LeaveReview))
