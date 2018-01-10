import axios from 'axios'

// action types
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CHANGE_CART_ITEM_QUANT = 'CHANGE_CART_ITEM_QUANT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

// initial state
const defaultCart = []

// action creators
export const addItemToCart = (productId, quantity=1) => ({
  type: ADD_CART_ITEM,
  productId,
  quantity
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


// reducer
export default function(state=defaultCart, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return [
        ...state,
        {
          productId: action.productId,
          quantity: action.quantity
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