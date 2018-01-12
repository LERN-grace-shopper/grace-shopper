const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Canceled', 'Completed')
  },
  address: {
    type: Sequelize.STRING
  }, 
  subtotal: {
    type: Sequelize.INTEGER
  }
})

Order.prototype.addItem = function(newItem) {
  // when adding item, it must have productId, price, and quantity.
  const { productId/*, price, quantity*/ } = newItem
  const foundItem = this.lineItems.find(item => item.id === productId)
  if (foundItem) {
    foundItem.quantity++
  }
  else {
    this.lineItems.push(newItem)
  }
}

module.exports = Order
