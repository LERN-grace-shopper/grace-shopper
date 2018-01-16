import axios from 'axios'

// action types

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDERS_BY_USER_ID = 'GET_ORDERS_BY_USER_ID'

// initial state

const defaultOrders = {
    orders: [],
    userOrders: []
}

// action creator

const getAllOrders = (allOrders) => {
    return {
        type: GET_ALL_ORDERS,
        orders: allOrders
    
    }
}

const getOrdersByUserId = (userOrders) => {
    return {
        type: GET_ORDERS_BY_USER_ID,
        userOrders: userOrders
    }
}

// thunk creator

// just for admins!
export function fetchAllOrders() {
    return function thunk(dispatch) {
        axios.get('/api/orders')
        .then(res => {
            dispatch(getAllOrders(res.data))
        })
    }
}

// for users
export function fetchOrdersByUserId(userId) {
    return function thunk(dispatch) {
        axios.get(`/api/orders/users/${userId}`)
        .then(res => {
            dispatch(getOrdersByUserId(res.data))
        })
    }
}
        

// reducer

export default function(state = defaultOrders, action) {
    switch (action.type) {
        case GET_ALL_ORDERS:
        return Object.assign({}, state, {
            orders: action.orders
        })
        case GET_ORDERS_BY_USER_ID: 
        return Object.assign({}, state, {
            userOrders: action.userOrders
        })
    default: 
        return state
    }
}