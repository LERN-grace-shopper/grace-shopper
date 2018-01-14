import axios from 'axios'

// action types

const GET_REVIEWS_BY_PRODUCT_ID = 'GET_REVIEWS_BY_PRODUCT_ID'

// initial state

const defaultReviews = {
    reviews: []
}

// action creator

const getReviewsByProductId = (reviews) => {
    return {
        type: GET_REVIEWS_BY_PRODUCT_ID,
        reviews
    }
}

// thunk creator

export function fetchReviewsByProductId(productId) {
    return function thunk(dispatch) {
        axios.get(`/api/reviews/${productId}`)
        .then(res => {
            dispatch(getReviewsByProductId(res.data))
        })
    }
}
        

// reducer

export default function(state = defaultReviews, action) {
    switch (action.type) {
        case GET_REVIEWS_BY_PRODUCT_ID:
        return Object.assign({}, state, {
            reviews: action.reviews
        })
    default: 
        return state
    }
}