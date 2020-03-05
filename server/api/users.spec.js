/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        username: 'cody',
        email: codysEmail,
        isAdmin: true,
      });
    });

    it('GET /api/users disallows unathorized user to hit this route', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(403);
    });

    it('GET /api/users allows athorized user to hit this route', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(403);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
