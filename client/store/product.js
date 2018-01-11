import axios from 'axios'

// action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

// initial state
const defaultProducts = {
  allProducts: [],
  viewingProduct: {}
}

// action creators
const getAllProducts = allProducts => ({type: GET_ALL_PRODUCTS, allProducts})
const getSingleProduct = viewingProduct => ({type: GET_SINGLE_PRODUCT, viewingProduct})
const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})

// thunk creators
export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => dispatch(getAllProducts(res.data)))
      .catch(err => console.error(err))

export const fetchSingleProduct = productId =>
  dispatch =>
    axios.get(`/api/products/${productId}`)
      .then(res => dispatch(getSingleProduct(res.data)))
      .catch(err => console.error(err))

export const removeProduct = productId =>
  dispatch =>
    axios.delete(`/api/products/${productId}`)
      .then(res => {
        dispatch(deleteProduct(productId))
        return res.status(204).send()
      })
      .catch(err => console.error(err))

// reducer
export default function(state=defaultProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        allProducts: action.allProducts,
        viewingProduct: state.viewingProduct
      }

    case GET_SINGLE_PRODUCT:
      return {
        allProducts: state.allProducts,
        viewingProduct: action.viewingProduct
      }

    case DELETE_PRODUCT:
      return {
        allProducts: state.allProducts.filter(product => product.id !== action.productId),
        viewingProduct: state.viewingProduct.id === action.productId ? {} : state.viewingProduct
      }

    default:
      return state
  }
}