import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/product.js'

const Product = props => {
  const {product} = props
  return (
    <div id="single-product-view">
      <h1 id="view-product-title">{props.product.title}</h1>
      <br />
      <img src={product.photoUrl} alt="product photoUrl loading fail" id="view-product-img"/>
      <br />
      <button>Add to cart</button>
      <br />
      <div id="view-product-desc">{props.product.description}</div>
    </div>
  )
}

const mapState = state => ({
  product: state.product.viewingProduct
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchSingleProduct(ownProps.match.params.productId))
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Product))