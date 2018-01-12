import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {Cart} from './index'

const Checkout = (props) => {
    return (
        <div>
            <Cart />
            <form> 
                <input
                    label="Name"
                    value={props.name}
                    onChange={handleChange}
                />
                <input
                    label="Address"
                    value={props.address}
                    onChange={handleChange}
                />
                <button  type="Submit" onClick={handleSubmit}>Complete your Order</button>
            </form>
        </div>
    )
}

const mapState = ()  => {
    return {
        
    }
}

const mapDispatch = (dispatch) => {
    return {

    }
}

export default withRouter(connect(mapState, mapDispatch)(Checkout))