import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { fetchCart, addToOrder, removeFromOrder } from "../store";
import {alterCheckoutForm, sendCheckoutFormToServer} from '../store/checkout-form'


const Cart = props => {

  let subtotal = props.cart.reduce((subtotal, product) => {

    return subtotal + product.price * product.ProductOrders.quantity
  }, 0)

  let total = subtotal * 1.0875

  const {name, address, handleChange, handleSubmit, user, handleCartAddClick, handleCartRemovalClick} = props

  return (<div>
      <li>
        {props.cart && props.cart.map(product => (<ul key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.photoUrl} alt="product photoUrl loading fail" />
                <h6>{product.title}</h6>
              </Link>
              <div>${(product.price / 100).toFixed(2)} each</div>
              <div>{product.ProductOrders.quantity} in cart</div>
              <button
                onClick={handleCartAddClick(
                  product.id,
                  product.ProductOrders.orderId
                )}
              >
                +
              </button>
              <button
                onClick={handleCartRemovalClick(
                  product.id,
                  product.ProductOrders.orderId
                )}
              >
                -
              </button>
            </ul>))}
      </li>
      <h5>subtotal: ${(subtotal / 100).toFixed(2)}</h5>
      <h5>total: ${(total / 100).toFixed(2)}</h5>
      <div>
        <form id="submit-form" onSubmit={event => handleSubmit(user, total, event)}>
          <div className="input-group input-group-lg">
            Name
            <input className="form-control" label="Name" name="name" value={name} onChange={handleChange} />
          </div>
          <br />
          <div>
            Address
            <input label="Address" name="address" value={address} onChange={handleChange} />
          </div>
          <br />
          <button className="btn btn-outline-primary" type="Submit">
            Complete your Order
          </button>
        </form>
      </div>
    </div>);}


const mapState = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchCart(+ownProps.match.params.userId))
  return {
    handleChange (event) {
        const alteration = {}
        alteration[event.target.name] = event.target.value
        dispatch(alterCheckoutForm(alteration))
    },
    handleSubmit (user, orderTotal, event) {
        event.preventDefault()
        const total = +(orderTotal / 100).toFixed(2)
        const name = event.target.name.value
        const address = event.target.address.value
        const userId = +ownProps.match.params.userId
        const status = 'Processing'
        const isCart = false

        dispatch(sendCheckoutFormToServer({
            name, address, status, total, isCart
        }, userId))
    },
    handleCartAddClick: (productId, orderId) => {
      return function() {
        dispatch(addToOrder(orderId, productId))
      }
    },

    handleCartRemovalClick: (productId, orderId) => {
      return function() {
        dispatch(removeFromOrder(orderId, productId))
      }
    }

  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart))
