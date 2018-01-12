const router = require("express").Router();
const { Product, Order, Cart } = require("../db/models");

/*POST cart route */
router.post("/", (req, res, next) => {
  if (req.user) {
    req.user.cart = req.body;
    res.send("users cart added");
  } else {
    req.session.cart = req.body;
    res.send("session cart added");
  }
});

/* GET/ cart route
if new user new cart on session
if req.user.id familiar - get cart from db and put it on the session */
router.get("/", (req, res, next) => {
  if (req.user) {
    res.send(Cart);
  } else {
    productOrder.findAll()
    .then(cart => {
        res.send(cart);

    })
  }
});

/* DELETE cart - if unauthenticated user, we want to delete it???? or we dont?? idk*/

/* PUT/ cart - add/remote item to cart on session (and in db if authenticated user) 
if item is already in the cart, update item quantity, else add it*/

//updates cart with whatever from the req.body. we should add more specifics on the front end side
router.put("/", (req, res, next) => {
  if (req.user) {
    req.user.cart = req.body;
    res.send("users cart updated");
  } else {
    req.session.cart = req.body;
    res.send("session cart updated");
  }
});

module.exports = router;
