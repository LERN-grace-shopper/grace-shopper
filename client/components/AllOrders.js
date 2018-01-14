import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchAllOrders} from '../store'

const AllOrders = (props) => {

    return (
        <div>
            <h2>Orders</h2>
            {props.orders && props.orders.map(order => {
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
  orders: state.order.orders
})

const mapDispatch = (dispatch, ownProps) => {
  dispatch(fetchAllOrders())
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(AllOrders))
