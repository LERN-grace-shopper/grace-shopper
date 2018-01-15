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
                                <h5 key={product.id}>{product.title}</h5>
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
  userOrders: state.order.userOrders
})

const mapDispatch = (dispatch, ownProps) => {
    console.log('ownProps', ownProps)
  dispatch(fetchOrdersByUserId(3))
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
