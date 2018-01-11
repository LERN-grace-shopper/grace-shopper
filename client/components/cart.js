import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'


const Cart = props => (
  <div>
    <li>
    {props.cart && props.cart.map(product => (
      <ul key={product.id}>
        <Link to={`/products/${product.id}`}>
          <img src={product.photoUrl} alt="product photoUrl loading fail" />
          <h6>{product.title}</h6>
        </Link>
        <div>{product.cartQuant} in cart</div>
      </ul>
    ))}
  </li>
  </div>
)


const mapState = state => ({
  cart: state.product.allProducts
    .filter(prod => state.cart.some(item => item.productId === prod.id))
    .map(prod => ({
      ...prod, 
      cartQuant: state.cart.find(item => item.productId === prod.id).quantity
    }))
})

// const mapDispatch = dispatch => ({

// })

export default withRouter(connect(mapState)(Cart))