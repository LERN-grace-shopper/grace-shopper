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

// thunk creator

// export const fetchReviewsByProductId = (productId) => 
//     dispatch => 
//         axios.get(`/reviews/${productId}`)
//         .then(res => {
//             dispatch(getReviewsByProductId(res.data))
//         })

export function fetchReviewsByProductId(productId) {
    return function thunk(dispatch) {
        axios.get(`/api/reviews/${productId}`)
        .then(res => {
            dispatch(getReviewsByProductId(res.data))
        })
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