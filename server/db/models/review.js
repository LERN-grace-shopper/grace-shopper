const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: [10, 2000]
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
