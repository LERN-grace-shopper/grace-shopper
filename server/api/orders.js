const router = require("express").Router();
const { Order } = require("../db/models");

// GET all orders
// GET orders by status (created, processing, canceled, completed)

router.get("/", (req, res, next) => {
    if (req.query.status) {
      return Order.findAll({
        where: { status: req.query.status }
      })
        .then(orders => res.json(orders))
        .catch(next);
    } else {
      return Order.findAll({
        include: [
          { all: true }
        ]
      })
        .then(orders => {
          res.json(orders)
        })
        .catch(next);
    }
  });

// GET order by id

router.get("/:orderId", (req, res, next) => {
  return Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

// POST Create a new order

router.post('/', (req, res, next) => {
  req.body.status = 'Processing';
  return Order.create(req.body)
  .then(order => res.json(order))
  .catch(next);
})

// PUT Change the status of an order

router.put('/:orderId', (req, res, next) => {
    return Order.update(req.body, {
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
