const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER
  },
  categories: {
    type: Sequelize.STRING,
    allowNull: false,
    default: 'boring'
  },
  photoUrl: {
    type: Sequelize.STRING,
    default: 'https://images.freeimages.com/images/large-previews/ad9/amethyst-quartz-2-1537357.jpg'
  }
})

module.exports = Product