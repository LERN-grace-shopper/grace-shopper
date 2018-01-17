const router = require("express").Router();
const { Product } = require("../db/models");

router.get('/', (req, res, next) => {
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


router.get('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      if (!product) {
        res.status(404).send()
      } else {
        res.json(product)
      }
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).json(newProduct))
    .catch(next);
})

router.put('/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      return product.update(req.body)
    })
    .then(updatedProd => res.json(updatedProd))
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      return Product.destroy(product)
    })
    .then(deletedProd => res.status(204).json(deletedProd))
    .catch(next)
})


module.exports = router;
