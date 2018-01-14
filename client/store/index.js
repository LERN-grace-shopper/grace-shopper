import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
import review from './review'
import adminUserList from './admin-user-list'
import checkout from './checkout-form'

export const reducer = combineReducers({user, product, cart, review, checkout, adminUserList})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './cart'
export * from './review'
export * from './admin-user-list'
export * from './checkout-form'