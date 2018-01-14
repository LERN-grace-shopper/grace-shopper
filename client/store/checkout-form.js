import axios from 'axios'

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

  // if we want to update order linked to userId, we would need axios.PUT with userId from the store (user.id)
  export function sendCheckoutFormToServer(fieldValues) {
    return function thunk(dispatch) {
        axios.post('/api/orders/', fieldValues)
        .then(res => {
            dispatch(sendCheckoutFormToServer(res.data))
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
