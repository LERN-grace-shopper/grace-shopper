const { expect } = require('chai')
const request = require('supertest')

const app = require('../index')
// Use the following if we need cookies to complete any tests:
// const agent = request.agent(app);

const db = require('../db')
const { Product } = require('../db/models')

describe('Products Route:', () => {
  beforeEach(() => db.sync({force: true}))

  describe('GET /api/products', () => {
    it('responds with an empty array via JSON at first', () => {
     return request(app)
        .get('/api/products')
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.have.length(0);
        })
        .expect(200)
    })

    it('responds with an array of all products currently in database', (done) => {
      const product = Product.build({
        title: 'Labradorite',
        description: 'A grounding stone that brings resilience and decisiveness',
        price: 40,
        inventoryQuantity: 22,
        categories: 'gray, iridescent, feldspar',
        photoUrl: 'https://images.freeimages.com/images/large-previews/ad9/amethyst-quartz-2-1537357.jpg'
      })

      product.save().then(() => {
        request(app)
          .get('/api/products')
          .expect((res) => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body[0].title).to.equal('Labradorite');
            expect(res.body[0].categories).to.equal('gray, iridescent, feldspar');
          })
          .expect(200, done)
      })
    })
  });

    describe('GET /api/products/1', () => {
      it('responds with a particular item identified by an ID', (done) => {
        const product = Product.build({
          title: 'Amethyst',
          price: 100,
          categories: 'purple'
        })

        product.save().then(() => {
          request(app)
            .get('/api/products/1')
            .expect((res) => {
              expect(res.body).to.be.an.instanceOf(Object);
              expect(res.body.title).to.equal('Amethyst');
              expect(res.body.price).to.equal(100);
            })
            .expect(200, done)
        })
      })

      it('responds with a 404 if the ID does not correspond with an actual product', () => {
        return request(app)
          .get('/api/products/72948')
          .expect(404)
      })
    })

    describe('GET /api/products?category=iridescent', () => {
      // This test is operating soundly but is clearly not ideal. I'm really wanting to move all new product creation to the beginning of this file and re-jigger each of the tests herein, but in the interest of time I will not.

      //Fun fact: all 'beforeEach' hooks run after all 'before' hooks
        beforeEach(() => {
          return Product.bulkCreate([{
            title: 'Moonstone',
            price: 22,
            categories: 'white, iridescent, feldspar'
          }, {
            title: 'Citrine',
            price: 39,
            categories: 'yellow, translucent, silicate'
          }, {
            title: 'Chalcopyrite',
            price: 18,
            categories: 'magnetic, dark, iridescent'
          }])
        })

      it('responds with an array of items belonging to a particular category', () => {
        return request(app)
          .get('/api/products?category=iridescent')
          .expect((res) => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(2)
          })
          .expect(200)
        })
  });


    // When route is in place, check to make sure this test is sound
  describe('POST /api/products', () => {
    xit('successfully creates a new product instance in the database', () => {
      return request(app)
        .post('/api/products')
        .send({
          title: 'Labradorite',
          description: 'A grounding stone that brings resilience and decisiveness',
          price: 70,
          inventoryQuantity: 22,
          categories: 'gray, iridescent, feldspar',
          photoUrl: 'https://images.freeimages.com/images/large-previews/ad9/amethyst-quartz-2-1537357.jpg'
        })
        .expect(201)
        .then(() => {
          return Product.findById(1)
        })
        .then(foundProd => {
          expect(foundProd.id).to.not.be.an('undefined');
          expect(foundProd.description).to.equal('A grounding stone that brings resilience and decisiveness');
          expect(foundProd.price).to.equal(70);
        })
    });
  });

  describe('PUT /api/products', () => {

    beforeEach(() => {
      Product.create({
        title: 'Juju',
        price: 100,
        categories: 'purple'
      })
    })

    xit('updates the information of an existing product', () => {
      return request(app)
        .put('/api/products/1')
        .send({
          title: 'Iolite',
          price: 72
        })
        .expect((res) => {
          expect(res.body.title).to.equal('Iolite')
          expect(res.body.price).to.equal(72)
        })
        .expect(200)
    });

    // When route is in place, check to make sure this test is sound
    xit('saves updates to the DB', () => {
      return request(app)
        .put('/api/products/1')
        .send({
          title: 'Amethyst',
          price: 47,
          categories: 'purple, silicate'
        })
        .then(() => {
          return Product.findById(1)
        })
        .then(foundProduct => {
          expect(foundProduct.title).to.equal('Amethyst')
          expect(foundProduct.price).to.equal(47)
          expect(foundProduct.categories).to.equal('purple, silicate')
        })
        .expect(200)
    })

    xit('responds with 500 for invalid update', () => {
      return request(app)
        .put('/api/products/1')
        .send({
          title: false
        })
        .expect(500)
    });
  });

  describe('DELETE /api/products', () => {
    beforeEach(() => {
      Product.create({
        title: 'Obsidian',
        price: 42,
        categories: 'black, igneous, silicate'
      })
    })

    // When route is in place, check this test to make sure it is sound
    xit('removes an existing product from the database and responds with a 204', () => {
      return request(app)
        .delete('/api/products/1')
        .then(() => {
          return Product.findAll()
        })
        .then(res => {
          expect(res.body).to.have.length(0)
        })
        .expect(204)
    });
  });

});
