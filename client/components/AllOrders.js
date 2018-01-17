import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchOrdersByUserId, fetchAllOrders} from '../store'

const AllOrders = (props) => {

    const orders = props.orders

    return (

        <div>
            <h2>Orders</h2>
            <br />
            {orders && orders.map(order => {
                return (
                    <div className="order-box" key={order.id}>
                        <h4>Order id: {order.id}</h4>
                        <h5>Status: {order.status}</h5>
                            <br />
                        <h5>Products</h5>
                        {order.products.map(product => {
                            return (
                                <div key={product.id}>
                                <h5>{product.title}</h5>
                                <h5>Quantity: {product.ProductOrders.quantity}</h5>
                                <h5>Address: {order.address}</h5>
                                </div>
                            )
                            
                        })}

                            <br />
                        
                        
                    </div>
                )
            })}
        </div>
    )

}

const mapState = (state) => {
    if (state.user.isAdmin) {
        return {
            orders: state.order.orders
        }
    } else {
        return {
            orders: state.order.orders.filter(order => order.userId === state.user.id)
        }
    }
}
    
    
const mapDispatch = (dispatch, ownProps) => {
    dispatch(fetchAllOrders())
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
