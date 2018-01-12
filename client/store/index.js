import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import product from './product'
import cart from './cart'
<<<<<<< HEAD
import adminUserList from './admin-user-list'

export const reducer = combineReducers({user, product, cart, adminUserList})
=======
import review from './review'

export const reducer = combineReducers({user, product, cart, review})
>>>>>>> 7da6174694a1bd0e62b7b669a003a73c9d80e8d7
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './cart'
<<<<<<< HEAD
export * from './admin-user-list'
=======
export * from './review'
>>>>>>> 7da6174694a1bd0e62b7b669a003a73c9d80e8d7
