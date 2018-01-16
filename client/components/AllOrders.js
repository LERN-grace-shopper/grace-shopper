import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchOrdersByUserId} from '../store'

const AllOrders = (props) => {
    console.log('PROPS', props)
    const orders = props.userOrders

    return (
        <div>
            <h2>My Orders</h2>
            {orders && orders.map(order => {
                return (
                    <div key={order.id}>
                        <h4>Order id:{order.id}</h4>
                        <h5>Status:{order.status}</h5>
                            <br />
                        <h5>Products</h5>
                        {order.products.map(product => {
                            return (
                                <div key={product.id}>
                                <h5>{product.title}</h5>
                                <h5>Quantity:{product.ProductOrders.quantity}</h5>
                                </div>
                            )
                            
                        })}

                            <br />
                        <div>Address: {order.address}</div>
                        
                    </div>
                )
            })}
        </div>
    )

}

const mapState = (state) => ({
  userOrders: state.order.userOrders,
  user: state.user
})

const mapDispatch = (dispatch, ownProps) => {
    console.log('ownProps', ownProps)
    const userId = ownProps.match.params.userId
    dispatch(fetchOrdersByUserId(userId))
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
