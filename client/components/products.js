import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Products = props => (
  <li>
    {props.products && props.products.map(product => (
      <ul key={product.id}>
        <Link>
          <img src={product.photoUrl} alt="product photoUrl loading fail" />
        </Link>
      </ul>
    ))}
  </li>
)

const mapState = state => ({
  products: state.product.allProducts
})

const mapDispatch = dispatch => ({
  
})

export default withRouter(connect(mapState, mapDispatch)(Products))
