const router = require('express').Router();
const { ProductOrder,Product, Order } = require('../db/models');

//fun fact: our req.user is not persistent on the session???

/*POST cart route */
router.post('/', (req, res, next) => {
  if (req.user) {
    Order.findOrCreate(
      {where: {
      userId: req.user.id,
      isCart: true
      },
      include: [{all: true}] // we can probably specify the attributes we want here instead of including all true?
    })
    .spread((userOrder, bool) => {
      res.json(userOrder.products)
    })
  } else {
    Order.findOrCreate({
      where:
      {sessionId: req.session.id,
      isCart: true
      },
      include: [{all: true}]
    })
    .spread((seshCart, bool) => res.json(seshCart.products))
    .catch(next)
  }
});

/* GET/ cart route
if new user new cart on session
if req.user.id familiar - get cart from db and put it on the session */
router.get('/', (req, res, next) => {
  if (req.user) {
  Order.findOne({
    where: {userId: req.user.id},
    include: [{all: true}]
  })
  .then(Orders => {
    res.json(Orders.products)
  })
  .catch(next)
  } else {
  Order.findOne({
    where: {sessionId: req.session.id},
    include: [{all: true}]
  })
  .then(cart => res.json(cart.products))
  .catch(next)
  }
});

/* DELETE cart - if unauthenticated user, we want to delete it???? or we dont?? idk*/

/* PUT/ cart - add/remote item to cart on session (and in db if authenticated user)
if item is already in the cart, update item quantity, else add it*/

//updates cart with whatever from the req.body. we should add more specifics on the front end side
// router.put('/', (req, res, next) => {
//   if (req.user) {
//     req.user.cart = req.body;
//     res.send('users cart updated');
//   } else {
//     req.session.cart = req.body;
//     res.send('session cart updated');
//   }
// });

module.exports = router;
