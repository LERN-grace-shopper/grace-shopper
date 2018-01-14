import axios from 'axios'
import state from './index'

// action types

const CHECKOUT_FORM_ALTERED = 'CHECKOUT_FORM_ALTERED'
const CHECKOUT_FORM_SUBMITTED = 'CHECKOUT_FORM_SUBMITTED'

// initial state

const emptyFields = {
  name: '',
  address: ''
}

// action creators

export const alterCheckoutForm = alteration => ({
  type: CHECKOUT_FORM_ALTERED,
  alteration
})

const submitCheckoutForm = fieldValues => ({
  type: CHECKOUT_FORM_SUBMITTED
})

// thunk creators


// can grab userId from the store, but need to check and see which order is open

export function sendCheckoutFormToServer(fieldValues, userId) {
  return function thunk(dispatch) {
      axios.put(`/api/orders/${userId}`, fieldValues)
      .then(res => {
          dispatch(submitCheckoutForm(res.data))
      })
  }
}


// reducer

export default function (state=emptyFields, action) {

  switch (action.type) {

    case CHECKOUT_FORM_ALTERED:
      return {
        ...state,
        ...action.alteration
      }

    case CHECKOUT_FORM_SUBMITTED:
      return state // what else should we do?

    default:
      return state
  }

}
