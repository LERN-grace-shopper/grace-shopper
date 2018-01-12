import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {Cart} from './index'
import {alterCheckoutForm, sendCheckoutFormToServer} from '../store/checkout-form'

const Checkout = (props) => {
    const {name, address, handleChange, handleSubmit} = props

    return (
        <div>
            <Cart />
            <form id="submit-form">
                <div>Name
                    <input
                        label="Name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>Address
                    <input
                        label="Address"
                        value={address}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="Submit" onClick={handleSubmit}>Complete your Order</button>
            </form>
        </div>
    )
}

const mapState = (state)  => {
    return {
        user: state.user,
        cart: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleChange (event) {
            const alteration = {}
            alteration[event.target.name] = event.target.value
            dispatch(alterCheckoutForm(alteration))
        },
        handleSubmit (event) {
            event.preventDefault()
            dispatch(sendCheckoutFormToServer({
                // whatever data we need to send
            }))
            alert('checkout form submission not implemented')
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))