import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import AllReviews from './AllReviews'
import LeaveReview from './single-review'
import {fetchSingleProduct, addItemToCart, fetchReviewsByProductId} from '../store'

const Product = props => {
  const {product, handleCartAddClick, numInCart} = props

  console.log('numInCart:', numInCart)
  return (
    <div id="single-product-view">
      <h1 id="view-product-title">{product.title}</h1>
      <br />
      <img src={product.photoUrl} alt="product photoUrl loading fail" id="view-product-img" />
      <br />
      <div>price: ${(product.price/100).toFixed(2)}</div>
      <br />
      <button onClick={handleCartAddClick(product.id)}>
        Add to cart 
      </button> {numInCart ? `(${numInCart} in cart)` : ''}
      <br />
      <div id="view-product-desc">Product Description:
      <br />
      {product.description}</div>
      <br />
      <div id="view-product-cats">Product Categories:
      <br />
      {product.categories}</div>
      <AllReviews />
      {/* Add isLoggedIn check to conditionally render LeaveReview (only for authenticated users) */}
      <LeaveReview productId={product.id} />
    </div>
  )
}

const mapState = state => {
  let itemInCart = state.cart.find(item => item.productId === state.product.viewingProduct.id) || {quantity: 0}

  return {
    product: state.product.viewingProduct,
    numInCart: itemInCart.quantity
  }
  
}

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchSingleProduct(ownProps.match.params.productId))
  return {
    handleCartAddClick (productId) {
      return function() {dispatch(addItemToCart(productId))}
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Product))
