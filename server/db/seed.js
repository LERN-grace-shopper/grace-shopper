const {
  Order,
  Product,
  Review,
  User
} = require('./models')

const products = [
  {
    title: 'Quartz',
    description: 'healing stone, composed of crystalline silica',
    price: 500,
    inventoryQuantity: 10, 
    categories: 'healing stones, silica, expensive', 
    photoUrl: ''
  }
]

const users = [
  {
    email: 'email@email.com',
    password: '1234',
    // salt,
    googleId: null,
    isAdmin: false
  }
]

const reviews = [
  {
    title: 'worst product ever',
    content: 'i licked this rock and it didn\'t taste good',
    rating: 5
  }
]

const orders = [
  {
    lineItems: [
      {
        price: 500,
        productId: 1,
        quantity: 1
      }
    ]
  }
]