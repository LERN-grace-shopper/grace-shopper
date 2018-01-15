import axios from 'axios'

// action types
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CHANGE_CART_ITEM_QUANT = 'CHANGE_CART_ITEM_QUANT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER'

// initial state
const defaultCart = []
const total = 0


// action creators
export const addItemToCart = (productId, quantity=1) => ({
  type: ADD_CART_ITEM,
  productId,
  quantity
})

export const addItemToOrder = (productId, orderId, userId) => ({
  type: ADD_ITEM_TO_ORDER,
  productId,
  orderId,
  userId
})

export const changeCartItemQuant = (productId, quantity) => ({
  type: CHANGE_CART_ITEM_QUANT,
  productId,
  quantity
})

export const removeItemFromCart = (productId) => ({
  type: REMOVE_CART_ITEM,
  productId
})

// thunk creators not needed since the cart is stored entirely clientside?
export const addToOrder = (productId, userId, orderId) => {
  return function (dispatch) {
    return axios.post(`/api/orders/cart`, {/* orderID*/})
    .then(res => {
      dispatch(addItemToOrder(orderId))
      return res.status(204).send("it works!")
    })
    .catch(err => console.error(err))

  }
}


// reducer
export default function(state=defaultCart, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      if (state.some(item => item.productId === action.productId)) {
        return state.map(lineItem => 
          lineItem.productId === action.productId
            ? {...lineItem, quantity: lineItem.quantity + 1}
            : lineItem
        )
      } else return [
        ...state,
        {
          productId: action.productId,
          quantity: action.quantity
        }
      ]
    case ADD_ITEM_TO_ORDER:
      return [
        ...state, 
        {
          productId,
          orderId,
          userId
        }
      ]

    case CHANGE_CART_ITEM_QUANT:
      return [
        ...state.filter(lineItem => lineItem.productId !== action.productId),
        {
          productId: action.productId,
          quantity: action.quantity
        }
      ]

    case REMOVE_CART_ITEM:
      return state.filter(lineItem => lineItem.productId !== action.productId)

    default:
      return state
  }
}
