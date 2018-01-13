const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrders', {
  quantity: {
     type: Sequelize.INTEGER,
     defaultValue: 1
   }
})

module.exports = ProductOrder
