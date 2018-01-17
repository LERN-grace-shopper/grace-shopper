import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { composeReview } from '../store/review-form'
import { postNewReview } from '../store'

const NewProduct = (props) => {
  

  return (
    <div>
      <form id="submit-review" onSubmit={(event) => props.handleSubmit(user, event)}>
    
        <div>Title:
          <br />
          <input
            label="product-title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>Description:
          <br />
          <textarea
            label="review-content"
            rows="5"
            cols="52"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <br />
        <div>Price
        <br />
        <input
          label="product-price"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </div>
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
        <button type="Submit" >Submit Review</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    title: state.newReview.title,
    content: state.newReview.content,
    rating: state.newReview.rating,
  }
}


// Note: I thought we could show the name of the reviewer associated with each review - I don't think we'd want to display their email, and they don't have a username, so I added the name field. I'm not sure how to handle it though, since we won't be sending it back to the database, we only care about displaying it with the review, so we'd be treating it differently than the rest of the form data

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleChange (event) {
      const changedInputVals = {}
      changedInputVals[event.target.name] = event.target.value
      dispatch(composeReview(changedInputVals))
    },
    handleSubmit (user, event) {
      event.preventDefault()
      const productId = ownProps.productId
      const title = event.target.title.value
      const content = event.target.content.value
      const rating = event.target.rating.value
      const userId = user.id
      dispatch(postNewReview({title, content, rating, productId, userId}))
      dispatch(composeReview({
        title: '',
        content: '',
        rating: ''
      }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewProduct))
