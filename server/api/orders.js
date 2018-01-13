const router = require("express").Router();
const { Order, ProductOrder } = require("../db/models");

// GET all orders
//right now passwords and salts are coming too, but that needs to not be a thing....
router.get("/", (req, res, next) => {
    if (req.query.status) {
      return Order.findAll({
        where: { status: { $like: `%${req.query.status}%` } }
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


//POST create an order --> (maybe fetch this upon initial page load?)
//req.body in json form needs to be:
/*{
	"address": "it works!",
  "total": "293231"
  "userId": "1"
}*/
router.post("/cart", (req, res, next) => {
  Order.create(req.body)
    .then(createdOrder => {
      res.send(createdOrder);
    })
    .catch(next);
});

// PUT Change the status of an order

//PUT /add -> add an item to the quantity /delete - remote an item from the quantity
router.put("/add", (req, res, next) => {
  const { orderId, productId } = req.body
  ProductOrder.findOrCreate({
    where: {orderId, productId}
  })
    .spread((add, bool) => {
      if (bool) {
        res.status(200).json(add)
      } else {
        add.increment('quantity')
        .then(addition => res.status(201).json(addition))
        .catch(next)
      }
    })
    .catch(next);
});

router.put("/remove", (req, res, next) => {
  const { orderId, productId } = req.body;
  ProductOrder.findOne({
    where: {orderId, productId}
  })
  .then(remove => {
    remove.decrement('quantity')
    .then(removal => res.status(201).json(removal))
    .catch(next)
  })
  .catch(next)
});

//GET -> /1 get user order
router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      res.json(order);
    })
    .catch(next);
});



module.exports = router;









//GET -> for admins get all the orders

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

// POST Create a new order

router.post("/", (req, res, next) => {
  req.body.status = "Processing";
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next);
});

// PUT Change the status of an order

router.put("/:orderId", (req, res, next) => {
  Order.update(req.body, {
    where: { id: req.params.orderId },
    returning: true
  })
    .then(results => {
      const updated = results[1][0];
      res.json(updated);
    })
    .catch(next);
});

module.exports = router;