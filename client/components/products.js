import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchAllProducts } from '../store'

const Products = (props) => {
  return (
    <div id="container">
      <ul id="flex-container">
        {props.products && props.products.map(product => {
          return (
            <li>
            <Link to={`/products/${product.id}`}>
            <img src={product.photoUrl} alt="product photoUrl loading fail" />
              
              <span>{product.title}</span>
              </Link>
            </li>
          )
        })}
      
      </ul>
  
    </div>






  )
} 



const mapState = state => ({
  products: state.product.allProducts
})

const mapDispatch = dispatch => {
  dispatch(fetchAllProducts())
  return {}
}

export default withRouter(connect(mapState, mapDispatch)(Products))

