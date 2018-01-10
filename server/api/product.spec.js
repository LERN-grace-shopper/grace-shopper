const { expect } = require('chai')
const request = require('supertest')

// Use the following if we need cookies to complete any tests:
const app = require('../index')
// const aagent = request.agent(app);

const db = require('../db')
const { Product } = require('../db/models')

describe('Products Route:', () => {
  beforeEach(() => db.sync({force: true}))

  describe('GET /api/products', () => {
    it('responds with an empty array via JSON at first', (done) => {
      request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect((res) => {
          console.log(res.body)
          expect(res.body).to.be.an.instanceOf(Array);
          expect(res.body).to.equal([])
        })
        .expect(200, done)
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

      return product.save().then(() => {
        request(app)
          .get('/products')
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

        return product.save().then(() => {
          request(app)
            .get('/products/1')
            .expect((res) => {
              expect(res.body).to.be.an.instanceOf(Array);
              expect(res.body).to.have.length(1);
              expect(res.body[0].title).to.equal('Amethyst');
              expect(res.body[0].price).to.equal(100);
            })
            .expect(200, done)
        })
      })

      it('responds with a 404 if the ID does not correspond with an actual product', (done) => {
        request(app)
          .get('/products/72948')
          .expect(404, done)
      })
    })

    describe('GET /api/products?category=iridescent', () => {
      it('responds with an array of items belonging to a particular category', (done) => {
      const productsToMake = [{
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
      }]

      return Product.bulkCreate(productsToMake).then(() => {
          request(app)
            .get('/products?category=iridescent')
            .expect((res) => {
              expect(res.body).to.be.an.instanceOf(Array);
              expect(res.body).to.have.length(2)
            })
            .expect(200, done)
          })
      })
  });


  describe('POST /api/products', () => {
    it('successfully creates a new product instance in the database', (done) => {
      request(app)
        .post('/api/products')
        .send({
          title: 'Labradorite',
          description: 'A grounding stone that brings resilience and decisiveness',
          price: 70,
          inventoryQuantity: 22,
          categories: 'gray, iridescent, feldspar',
          photoUrl: 'https://images.freeimages.com/images/large-previews/ad9/amethyst-quartz-2-1537357.jpg'
        })
        .expect((res) => {
          console.log('Inside POST route test')
          expect(res.body.product.id).to.not.be.an('undefined');
          expect(res.body.product.description).to.equal('A grounding stone that brings resilience and decisiveness');
          expect(res.body.product.price).to.equal(70);
        })
        .expect(200, done)
    });
  });

  // describe('PUT /api/products', () => {
  //   it('does a thing', () => {
  //
  //   });
  //
  //   it('does another thing', () => {
  //
  //   });
  // });
  //
  // describe('DELETE /api/products', () => {
  //   it('this does something fancy', () => {
  //
  //   });
  //
  //   it('responds with an array of all products currently in database', () => {
  //
  //   });
  // });

});
