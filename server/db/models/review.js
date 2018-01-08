const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.Text,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER
  }
})

module.exports = Review
