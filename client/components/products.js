import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/product.js'

const Products = props => (
  <li>
    {props.products && props.products.map(product => (
      <ul key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img src={product.photoUrl} alt="product photoUrl loading fail" />
          <h6>{product.title}</h6>
        </Link>
      </ul>
    ))}
  </li>
)

const mapState = state => ({
  products: state.product.allProducts
})

const mapDispatch = dispatch => {
  dispatch(fetchAllProducts())
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Products))
