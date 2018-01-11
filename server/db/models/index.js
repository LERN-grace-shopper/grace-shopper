const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const productOrder = require('./cart')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Review.belongsTo(User)
User.hasMany(Review)
productOrder.belongsTo(User)
User.hasOne(productOrder)
Review.belongsTo(Product)
Product.hasMany(Review)
Order.belongsTo(User) // or guest session?? idk
User.hasMany(Order)
Product.belongsToMany(Order, {through: productOrder}) //join table for cart
Order.belongsToMany(Product, {through: productOrder}) // our cart is now a seperate table that has 


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Review,
  productOrder
}
