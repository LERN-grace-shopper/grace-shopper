export const COMPOSE_REVIEW = 'COMPOSE_REVIEW'

const inputValues = {
  name: '',
  title: '',
  content: '',
  rating: '', // will need to become an integer?
}

export const composeReview = change => {
  type: COMPOSE_REVIEW,
  change
}

export default function (state = '', action) {
  switch (action.type) {
    case COMPOSE_REVIEW:
      // console.log('INSIDE of COMPOSE_REVIEW') // not logging
      return {
        ...state,
        ...action.change
      }
    default:
      return state
  }
}
