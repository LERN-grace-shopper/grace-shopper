import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'


const Cart = props => {
  let subtotal = props.cart.reduce((subtotal, product) => (
    subtotal + product.price * product.cartQuant
  ), 0)

  let total = subtotal * 1.0875

  return (
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
    <h5>subtotal: ${(subtotal/100).toFixed(2)}</h5>
    <h5>total: ${(total/100).toFixed(2)}</h5>
    <Link to="/checkout">
      <button>Checkout!</button>
    </Link>
  </div>
)}


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
