import {expect} from 'chai'

import {createStore} from 'redux'
import {reducer} from './index.js'

describe('the main reducer', () => {

  let testStore
  beforeEach('create the test store', () => {
    testStore = createStore(reducer)
  })

  it('has the expected initial state', () => {
    expect(testStore.getState()).to.deep.equal({
      cart: [],
      product: {
        allProducts: [],
        viewingProduct: {}
      },
      user: {}
    })
  })
})
