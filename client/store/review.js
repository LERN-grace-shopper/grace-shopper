import axios from 'axios'

// action types

const GET_REVIEWS_FOR_ALL_PRODUCTS = 'GET_REVIEWS_FOR_ALL_PRODUCTS'
const GET_REVIEWS_BY_PRODUCT_ID = 'GET_REVIEWS_BY_PRODUCT_ID'

// initial state

const defaultReviews = {
    reviews: [], // retaining this to avoid breaking the "AllReviews" component
    allReviews: []
}

// action creator

const getReviewsByProductId = (reviews) => {
    return {
        type: GET_REVIEWS_BY_PRODUCT_ID,
        reviews
    }
}

const getReviewsForAllProducts = (allReviews) => {
    return {
        type: GET_REVIEWS_FOR_ALL_PRODUCTS,
        allReviews
    }
}


// export const fetchReviewsByProductId = (productId) =>
//     dispatch =>
//         axios.get(`/reviews/${productId}`)
//         .then(res => {
//             dispatch(getReviewsByProductId(res.data))
//         })

// thunk creator


export function fetchReviewsByProductId(productId) {
    return function thunk(dispatch) {
        axios.get(`/api/reviews/${productId}`)
        .then(res => {
            dispatch(getReviewsByProductId(res.data))
        })
    }
}

// I think this thunk will work, it's just not being passed the proper data
// export function postNewReview (newReview) {
//   return function (dispatch) {
//     axios.post('/api/reviews', newReview)
//       .then(res => res.data)
//       .then(addedReview => dispatch(getReviewsByProductId(addedReview.productId)))
//       .catch(err => console.error(err))
//   }
// }

export function postNewReview (newReview) {
    return function (dispatch) {
      axios.post('/api/reviews', newReview)
        .then(res => res.data)
        .then(newReview => {
            dispatch(fetchReviewsByProductId(newReview.productId))
        })
        .catch(err => console.error(err))
    }
  }

export function fetchReviewsForAllProducts() {
    return function thunk(dispatch) {
        axios.get(`/api/reviews/`)
        .then(res => {
            dispatch(getReviewsForAllProducts(res.data))
        })
    }
}
        

// reducer

export default function(state = defaultReviews, action) {
    switch (action.type) {
        case GET_REVIEWS_BY_PRODUCT_ID:
            return {
                ...state,
                reviews: action.reviews
            }

        case GET_REVIEWS_FOR_ALL_PRODUCTS:
            return {
                ...state,
                allReviews: action.allReviews
            }
        
        default:
            return state
    }
}
