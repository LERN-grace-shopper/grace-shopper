import {expect} from 'chai'

import {createStore} from 'redux'
import {reducer} from './index.js'

describe('the main reducer', () => {

  let testStore
  beforeEach('create the test store', () => {
    testStore = createStore(reducer)
  })

  it('has the expected initial state', () => {
    expect(testStore.getState().to.deep.equal({
      cart: [],
      product: {
        allProducts: [],
        viewingProduct: {}
      },
      user: {}
    }))
  })

  describe('the cart', () => {
    it('can have an item added, its quantity changed, and the item removed', () => {
      testStore.dispatch({
        type: ADD_CART_ITEM,
        productId: 6,
        quantity: 1
      })
      expect(testStore.getState().cart.to.deep.equal(
        [{productId: 6, quantity: 1}]
      ))
      testStore.dispatch({
        type: ADD_CART_ITEM,
        productId: 6,
        quantity: 1
      })
      expect(testStore.getState().cart.to.deep.equal(
        [{productId: 6, quantity: 2}]
      ))
      testStore.dispatch({
        type: CHANGE_CART_ITEM_QUANT,
        productId: 6,
        quantity: 10
      })
      expect(testStore.getState().cart.to.deep.equal(
        [{productId: 6, quantity: 10}]
      ))
      testStore.dispatch({
        type: ADD_CART_ITEM,
        productId: 3,
        quantity: 17
      })
      testStore.dispatch({
        type: REMOVE_CART_ITEM,
        productId: 6
      })
      expect(testStore.getState().cart.to.deep.equal(
        [{productId: 3, quantity: 17}]
      ))
    })
  })
})
