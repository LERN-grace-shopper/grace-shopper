const router = require("express").Router();
const { Product, Order } = require("../db/models");

//updates cart with whatever from the req.body. we should add more specifics on the front end side
router.put("/", (req,res,next) => {
    req.session.cart = req.body
    res.send(req.session.cart)
})

module.exports = router
