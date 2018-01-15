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
            <h2>Orders</h2>
            {orders && orders.map(order => {
                return (
                    <div key={order.id}>
                        <h4>{order.id}</h4>
                            <br />
                        <h5>{order.status}</h5>
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
})

const mapDispatch = (dispatch, ownProps) => {
    console.log('ownProps', ownProps)
  dispatch(fetchOrdersByUserId(3))
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
