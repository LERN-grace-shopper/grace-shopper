import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {composeReview, submitReview} from '../store/review-form'

const LeaveReview = (props) => {
  const {title, content, rating, handleChange, handleSubmit} = props

  return (
    <div>
      <form id="submit-review">
        <div>Name:
          <br />
          <input
            type="text"
            name="Name"
            value={title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>Leave A Review:
          <br />
          <textarea
            rows="5"
            cols="52"
            name="Content"
            value={content}
            onChange={handleChange}
            placeholder="What did you think of this product?"
          />
        </div>
        <br />
        <div>Rating:
          <br />
          <input
            type="text"
            name="Rating"
            placeholder="1 - 5"
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
