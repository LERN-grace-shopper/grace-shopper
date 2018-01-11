import { expect } from 'chai'

import { createStore } from 'redux'
import { reducer } from './index.js'


// these are copy-pasted and need to be de-hardcoded
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CHANGE_CART_ITEM_QUANT = 'CHANGE_CART_ITEM_QUANT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'


describe('the cart', () => {

  let testStore
  beforeEach('create the test store', () => {
    testStore = createStore(reducer)
  })

  it('can have an item added, its quantity changed, and the item removed', () => {
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 6,
      quantity: 1
    })
    expect(testStore.getState().cart).to.deep.equal(
      [{ productId: 6, quantity: 1 }]
    )
  })

  it('will contain one object with quantity:2 if the same item is added twice', () => {
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 6,
      quantity: 1
    })
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 6,
      quantity: 1
    })
    expect(testStore.getState().cart).to.deep.equal(
      [{ productId: 6, quantity: 2 }]
    )
  })

  it('will respond appropriately to an item quantity change action', () => {
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 6,
      quantity: 1
    })
    testStore.dispatch({
      type: CHANGE_CART_ITEM_QUANT,
      productId: 6,
      quantity: 10
    })
    expect(testStore.getState().cart).to.deep.equal(
      [{ productId: 6, quantity: 10 }]
    )
  })

  it('will not contain an item after an action is dispatched for its removal', () => {
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 6,
      quantity: 1
    })
    testStore.dispatch({
      type: ADD_CART_ITEM,
      productId: 3,
      quantity: 17
    })
    testStore.dispatch({
      type: REMOVE_CART_ITEM,
      productId: 6
    })
    expect(testStore.getState().cart).to.deep.equal(
      [{ productId: 3, quantity: 17 }]
    )
  })
})
