/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(async () => {
        cody = await User.create({
          username: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones',
        });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')

  describe('default values and validations', () => {
    let cody;

    beforeEach(async () => {
      cody = await User.create({
        username: 'cody',
        email: 'cody@puppybook.com',
        password: 'bones',
      });
    });

    it('returns false if isAdmin is not set', () => {
      expect(cody.isAdmin).to.be.equal(false);
    });
  }); // end describe('defaultValues')

  describe('unique key constraints', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    it('throws error if user with nonunique email is entered', async () => {
      await User.create({ username: 'nati', email: 'nati@gmail.com' });

      try {
        const userEmailNonUnique = await User.create({
          username: 'natasha',
          email: 'nati@gmail.com',
        });

        if (userEmailNonUnique)
          throw Error(
            'Validation should have failed with validation unique key constraint'
          );
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed');
      }
    });

    it('throws error if user with nonunique name is entered', async () => {
      await User.create({ username: 'nati', email: 'nati@gmail.com' });

      try {
        const userNameNonUnique = await User.create({
          username: 'nati',
          email: 'nati@aol.com',
        });

        if (userNameNonUnique)
          throw Error(
            'Validation should have failed with validation unique key constraint'
          );
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed');
      }
    });
  }); // end describe('unique key constraints')
}); // end describe('User model')
