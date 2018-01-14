import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { composeReview } from '../store/review-form'
import { postNewReview } from '../store'

const LeaveReview = (props) => {
  const {name, title, content, rating, handleChange, handleSubmit} = props

  return (
    <div>
      <form id="submit-review">
        <div>Name:
          <br />
          <input
            label="reviewer-name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>Title:
          <br />
          <input
            label="review-title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>Leave A Review:
          <br />
          <textarea
            label="review-content"
            rows="5"
            cols="52"
            name="content"
            value={content}
            onChange={handleChange}
            placeholder="What did you think of this product?"
          />
        </div>
        <br />
        <div>Rating:
          <br />
          <input
            label="review-rating"
            name="rating"
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
    user: state.user, // we will want the user's id to associate with the review (as userId)
    // changedInputValues: state.change
  }
}


// Note: I thought we could show the name of the reviewer associated with each review - I don't think we'd want to display their email, and they don't have a username, so I added the name field. I'm not sure how to handle it though, since we won't be sending it back to the database, we only care about displaying it with the review, so we'd be treating it differently than the rest of the form data

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleChange (event) {
      // This function does not work yet
      const changedInputVals = {}
      changedInputVals[event.target.name] = event.target.value
      dispatch(composeReview(changedInputVals))
    },
    handleSubmit (event) {
      event.preventDefault()
      const productId = ownProps.productId
      const name = event.target.name.value // see note above mapDispatch
      const title = event.target.title.value
      const content = event.target.content.value
      const rating = event.target.rating.value
      dispatch(postNewReview({title, content, rating, productId})) // will also want userId
      dispatch(composeReview(''))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(LeaveReview))
