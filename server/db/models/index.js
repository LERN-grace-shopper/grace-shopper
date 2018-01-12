const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const Cart = require('./cart')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Review.belongsTo(User)
User.hasMany(Review)
Cart.belongsTo(User)
User.hasMany(Cart)
Review.belongsTo(Product)
Product.hasMany(Review)
Order.belongsTo(User) // or guest session?? idk
User.hasMany(Order)
Product.belongsToMany(Order, {through: Cart}) //join table for cart
Order.belongsToMany(Product, {through: Cart}) // our cart is now a seperate table that has 



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
  Cart
}
