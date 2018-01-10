const router = require("express").Router();
const { Product, Order } = require("../db/models");

//note: these routes should only be reacheable if the session id matches
//POST - creates the cart ()
//exists whenever the user on site
router.get("/", (req,res,next) => {
    const {cart} = req.session
    console.log("CART????", cart)
    res.send("is this even working???")
})

//PUT - add items to cart (ie updatting it)
// updates cart
// upon completion cart -> order
router.put("/", (req,res,next) => {

})

//GET - get the cart
router.get("/", (req,res,next) => {
    res.json(req.session.cart)
})



module.exports = router
