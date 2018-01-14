import axios from 'axios'

// action types

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDERS_BY_USER_ID = 'GET_ORDERS_BY_USER_ID'

// initial state

const defaultOrders = {
    orders: []
}

// action creator

const getAllOrders = (allOrders) => {
    return {
        type: GET_ALL_ORDERS,
        orders: allOrders
    
    }
}

const getOrdersByUserId = (userId) => {
    return {
        type: GET_ORDERS_BY_USER_ID,
        userId
    }
}

// thunk creator

export function fetchAllOrders() {
    return function thunk(dispatch) {
        axios.get('/api/orders')
        .then(res => {
            dispatch(getAllOrders(res.data))
        })
    }
}

// export function fetchReviewsByProductId(productId) {
//     return function thunk(dispatch) {
//         axios.get(`/api/reviews/${productId}`)
//         .then(res => {
//             dispatch(getReviewsByProductId(res.data))
//         })
//     }
// }
        

// reducer

export default function(state = defaultOrders, action) {
    switch (action.type) {
        case GET_ALL_ORDERS:
        return Object.assign({}, state, {
            orders: action.orders
        })
    default: 
        return state
    }
}