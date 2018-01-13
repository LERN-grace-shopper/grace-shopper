const db = require('./db');


const {
  Order,
  Product,
  Review,
  User,
  Cart
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
  },
  {
    email: 'admin@admin.com',
    password: 'admin',
    googleId: null,
    isAdmin: true
  }
]

const reviews = [
  {
    title: "worst product ever",
    content: "i licked this rock and it didn't taste good",
    rating: 5
  },
  {
    title: "best product ever",
    content: "i licked this rock and it tasted great!",
    rating: 1
  }
];

const orders = [
  {
    status: 'Created',
    address: "193 Fullstack St. Brooklyn, NY 11239",
  }
];


async function seed () {
  await db.sync({force: true})

  const creatingUsers = await Promise.all(users.map(user => User.create(user)))
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const creatingProducts = await Promise.all(products.map(product => Product.create(product)))
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)

  const creatingReviews = await Promise.all(reviews.map(review => Review.create(review)))
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded successfully`)

  const creatingOrders = await Promise.all(orders.map(order => Order.create(order)))
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)

}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
