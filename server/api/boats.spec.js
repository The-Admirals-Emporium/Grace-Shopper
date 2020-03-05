/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Boat = db.model('boat');

describe('Boat routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/boats/', () => {
    // name, imageUrl, description, cost
    const name = 'Titanic';
    const imageUrl = 'www.thebest.com/YUjdahf';
    const description = 'This boat was thought to be unsinkable';
    // 2,147,483,647 is the biggest 32 bit signed int
    const cost = 2147483647;

    beforeEach(() => {
      return Boat.create({
        name,
        imageUrl,
        description,
        cost,
      });
    });

    it('GET /api/boats', async () => {
      const res = await request(app)
        .get('/api/boats')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(name);
      expect(res.body[0].cost).to.be.equal(cost);
      expect(res.body[0].description).to.be.equal(description);
      expect(res.body[0].imageUrl).to.be.equal(imageUrl);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
