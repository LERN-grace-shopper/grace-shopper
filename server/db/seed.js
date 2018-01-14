const db = require('./db');


const {
  Order,
  Product,
  Review,
  User,
  Cart,
  ProductOrder
} = require('./models')



const products = [
  {
    title: 'Quartz',
    description: 'This is a healing stone, composed of crystalline silica',
    price: 500,
    inventoryQuantity: 10,
    categories: 'Healing, Expensive',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/AdulaireSuisse2.jpg/218px-AdulaireSuisse2.jpg'
  },
  {
    title: 'Moonstone',
    description: 'An energizing and powerful stone, moonstone will help you with confidence and self esteem.',
    price: 10,
    inventoryQuantity: 100,
    categories: 'Energizing',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/AdulaireSuisse2.jpg/218px-AdulaireSuisse2.jpg'
  },
  {
    title: 'Amethyst',
    description: 'A protective stone that can help you calm your mind and focus.',
    price: 15,
    inventoryQuantity: 20,
    categories: 'Calming',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/AdulaireSuisse2.jpg/218px-AdulaireSuisse2.jpg'
  },
  {
    title: 'Rose quartz',
    description: 'A beautiful stone that enhances love and promotes positivity.',
    price: 30,
    inventoryQuantity: 60,
    categories: 'Positivity',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/AdulaireSuisse2.jpg/218px-AdulaireSuisse2.jpg'
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
  },
  {
    email: 'ung.natalie@gmail.com',
    password: 'natalie',
    googleId: null,
    isAdmin: false
  },
  {
    email: 'ruthhill.e@gmail.com',
    password: 'ruth',
    googleId: null,
    isAdmin: true
  }
]

const reviews = [
  {
    title: "worst product ever",
    content: "i licked this rock and it didn't taste good",
    rating: 5,
    userId: 1,
    productId: 1
  },
  {
    title: "best product ever",
    content: "i licked this rock and it tasted great!",
    rating: 1,
    userId: 2,
    productId: 2
  },
  {
    title: "Wow!",
    content: "I never write reviews, but I just had to for this crystal! This crystal had a calming effect and I encourage those of you with busy, stressful lives to purchase this crystal.",
    rating: 1,
    userId: 3,
    productId: 2
  },
  {
    title: "Pleasantly surprised",
    content: "I honestly didn't know what to expect with this, but I thought it did have some positive effects!",
    rating: 4,
    userId: 4,
    productId: 3
  }
];

const orders = [
  {
    status: 'Created',
    address: "193 Fullstack St. Brooklyn, NY 11239",
    total: 50,
    isCart: true,
    userId: 1
  },
  {
    status: 'Processing',
    address: "100 Shady Lane Portland, OR 97202",
    total: 50,
    isCart: false,
    userId: 1
  },
  {
    status: 'Canceled',
    address: "333 Cool Boulevard Seattle, WA 98133",
    total: 100,
    isCart: false,
    userId: 2
  },
  {
    status: 'Created',
    address: "7895 Potato Lane Boise, ID 83704",
    total: 250,
    isCart: true,
    userId: 3
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
