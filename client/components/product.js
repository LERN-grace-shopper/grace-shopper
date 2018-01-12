import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import AllReviews from './AllReviews'
import {fetchSingleProduct, addItemToCart, fetchReviewsByProductId} from '../store'

const Product = props => {
  const {product, handleCartAddClick} = props
  
  console.log('PROPS', props)
  return (
    <div id="single-product-view">
      <h1 id="view-product-title">{product.title}</h1>
      <br />
      <img src={product.photoUrl} alt="product photoUrl loading fail" id="view-product-img" />
      <br />
      <button onClick={handleCartAddClick(product.id)}>Add to cart</button>
      <br />
      <div id="view-product-desc">Product Description:{product.description}</div>
      <div id="view-product-reviews">Reviews:</div>
      <AllReviews />
    </div>
  )
}

const mapState = state => ({
  product: state.product.viewingProduct
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchSingleProduct(ownProps.match.params.productId))
  return {
    handleCartAddClick (productId) {
      return function() {dispatch(addItemToCart(productId))}
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Product))
