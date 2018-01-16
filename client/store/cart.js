import axios from 'axios'

// action types
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CHANGE_CART_ITEM_QUANT = 'CHANGE_CART_ITEM_QUANT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const ADD_TO_ORDER = 'ADD_TO_ORDER'


// initial state
const defaultCart = []
const total = 0


// action creators
export const addItemToCart = (orderId, productId, quantity=1) => ({
  type: ADD_CART_ITEM,
  productId,
  orderId,
  quantity
})



export const changeCartItemQuant = (productId, quantity) => ({
  type: CHANGE_CART_ITEM_QUANT,
  productId,
  quantity
})



// thunk creators not needed since the cart is stored entirely clientside?
export const addToOrder = (orderId, productId) => { 
  return function (dispatch) {
    const order = {orderId, productId}
    return axios.put(`/api/orders/add`, order)
      .then(res => {
        console.log("res???",res.data)
        dispatch(addItemToCart(res.data.orderId, res.data.productId, res.data.quantity))
      })
      .catch(err => console.error(err))
  }
}

export const removeFromOrder = (orderId, productId) => {
  return function (dispatch) {
    const order = {orderId, productId}
    return axios.put(`/api/orders/remove`, order)
      .then(res => {
        dispatch(addItemToCart(res.data.orderId, res.data.productId, res.data.quantity))
      })
  }
}


// reducer
export default function(state=defaultCart, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      if (state.some(item => item.productId === action.productId)) {
        return state.map(lineItem => (lineItem.productId === action.productId ? {...lineItem, quantity: action.quantity } : lineItem));
      } else return [...state, { 
        productId: action.productId,
        orderId: action.orderId, 
        quantity: action.quantity }];
    case CHANGE_CART_ITEM_QUANT:
      return [...state.filter(lineItem => lineItem.productId !== action.productId), { productId: action.productId, quantity: action.quantity }];

    case REMOVE_CART_ITEM:
      return state.filter(lineItem => lineItem.productId !== action.productId);

    default:
      return state;
  }
}
