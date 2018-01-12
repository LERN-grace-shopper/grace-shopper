const router = require("express").Router();
const { Product } = require("../db/models");

router.get("/", (req, res, next) => {
  if (req.query.category) {
    Product.findAll({
      where: { categories: { $like: `%${req.query.category}%` } }})
      .then(products => res.json(products))
      .catch(next);
  } else {
    Product.findAll()
      .then(products => res.json(products))
      .catch(next);
  }
});

router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId, {include: [{all: true}]})
    .then(product => res.json(product))
    .catch(next);
});


module.exports = router;
