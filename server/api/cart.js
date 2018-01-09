const router = require("express").Router();
const { Product, Order } = require("../db/models");

//POST - creates the cart ()
//exists whenever the user on site

//PUT - add items to cart (ie updatting it)
//if cart - update 
//else post

//GET - get the cart
router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
    // .spread(([...foundOrder]) => {

    // })
})

//DELETE


module.exports = router
