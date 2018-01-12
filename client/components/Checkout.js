import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

const Checkout = (props) => {
    return (
        <div>
            <h1>we're here!</h1>
        </div>
    )
}

const mapState = ()  => {

}

const mapDispatch = (dispatch) => {

}

export default withRouter(connect(mapState, mapDispatch)(Checkout))