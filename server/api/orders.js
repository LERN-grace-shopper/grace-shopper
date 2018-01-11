const router = require("express").Router();
const { Order } = require("../db/models");

// GET all orders
// GET orders by statusId (created, processing, canceled, completed)

//this route is not yet fully functional, definetly needs refactoring
router.get("/", (req, res, next) => {
    if (req.query.status) {
      Order.findAll({
        where: { status: { $like: `%${req.query.status}%` } }
      })
        .then(orders => res.json(orders))
        .catch(next);
    } else {
      Order.findAll()
        .then(orders => res.json(orders))
        .catch(next);
    }
  });

// GET order by id

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

// PUT Change the status of an order

router.put('/:orderId', (req, res, next) => {
    Order.update(req.body, {
        where: {id: req.params.orderId},
        returning: true
    })
    .then(results => {
        const updated = results[1][0]
        res.json(updated)
    })
    .catch(next)
})


module.exports = router;