import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {Cart} from './index'
import {alterCheckoutForm, sendCheckoutFormToServer} from '../store/checkout-form'

const Checkout = (props) => {
    const {name, address, handleChange, handleSubmit, user} = props

    return (
        <div>
            <Cart />
            <form id="submit-form" onSubmit={handleSubmit}>
                <div className="input-group input-group-lg">Name
                    <input
                        className="form-control"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>Address
                    <input
                        label="Address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button className="btn btn-outline-primary" type="Submit">Complete your Order</button>
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

const mapDispatch = (dispatch, ownProps) => {
    return {
        handleChange (event) {
            const alteration = {}
            alteration[event.target.name] = event.target.value
            dispatch(alterCheckoutForm(alteration))
        },
        handleSubmit (event) {
            event.preventDefault()
            const name = event.target.name.value
            const address = event.target.address.value
            // const userId = ????????
            dispatch(sendCheckoutFormToServer({
                name, address
            }, userId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))