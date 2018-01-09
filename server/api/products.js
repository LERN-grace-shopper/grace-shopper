const router = require("express").Router();
const { Product } = require("../db/models");
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get("/", (req, res, next) => {
  if (req.query.category) {
    Product.findAll({
      where: { categories: { [Op.like]: `%${req.query.category}%` } }
    })
      .then(products => res.json(products))
      .catch(next);
    //we havent tested this yet, so still not sure if it works exactly as we expect
  } else {
    Product.findAll()
      .then(products => res.json(products))
      .catch(next);
  }
});

router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next);
});

module.exports = router;
