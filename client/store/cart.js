import axios from 'axios'

// action types
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
const GET_CART = 'GET_CART'
const ADD_ORDER_ITEM_TO_CART = 'ADD_ORDER_ITEM_TO_CART'

const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CHANGE_CART_ITEM_QUANT = 'CHANGE_CART_ITEM_QUANT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const ADD_TO_ORDER = 'ADD_TO_ORDER'



// initial state
const defaultCart = []
// { id: 1, status: "Processing", }
const total = 0



// action creators
export const addItem = (order) => ({
  type: ADD_ITEM_TO_CART,
  order
})

export const addOrderItemToCart = (order) => ({
  type: ADD_ORDER_ITEM_TO_CART,
  order
})


export const addItemToCart = (orderId, productId, quantity=1) => ({
  type: ADD_CART_ITEM,
  productId,
  orderId,
  quantity
})


export const removeItemFromCart = (order) => ({
  type: REMOVE_ITEM_FROM_CART,
  order
})

export const changeCartItemQuant = (productId, quantity) => ({
  type: CHANGE_CART_ITEM_QUANT,
  productId,
  quantity
})

export const getCart = (order) => ({
  type: GET_CART,
  order
})



// thunk creators not needed since the cart is stored entirely clientside?
export const addToOrder = (orderId, productId) => {
  return function (dispatch) {
    const order = {orderId, productId}
    return axios.put(`/api/orders/add`, order)
      .then(res => {
        dispatch(addItem(res.data))
      })
      .catch(err => console.error(err))
  }
}


export const removeFromOrder = (orderId, productId) => {
  return function (dispatch) {
    const order = {orderId, productId}
    return axios.put(`/api/orders/remove`, order)
      .then(res => {
        dispatch(removeItemFromCart(res.data))
      })
      .catch(err => console.error(err))
  }
}

export const fetchCart = () => {
  return function (dispatch) {
    return axios.get(`/api/orders/cart`)
      .then(res => {
        dispatch(getCart(res.data.products))
      })
      .catch(err => console.error(err))
  }
}

// reducer
export default function(state=defaultCart, action) {
  switch (action.type) {

    case ADD_ITEM_TO_CART:

        return state.map(item => {
          if (item.id === action.order.productId) {
            return Object.assign({}, item, {ProductOrders: Object.assign({}, item.ProductOrders, {quantity: item.ProductOrders.quantity+1})})
          } else {
            return Object.assign({}, item, {ProductOrders: Object.assign({}, item.ProductOrders, {quantity: 1})})
        }
      }
  )

    case REMOVE_ITEM_FROM_CART:
      return state.map(item => {
        if (item.id === action.order.productId) {
          return Object.assign({}, item, {ProductOrders: Object.assign({}, item.ProductOrders, {quantity: item.ProductOrders.quantity-1})})
        } else {
          return item
      }
    })

    case CHANGE_CART_ITEM_QUANT:
      return [...state.filter(lineItem => lineItem.productId !== action.productId), { productId: action.productId, quantity: action.quantity }];

    case REMOVE_CART_ITEM:
      return state.filter(lineItem => lineItem.productId !== action.productId);

    case GET_CART:
      return [...action.order]

    default:
      return state;
  }
}
