/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Boat = db.model('boat');

describe('Boat model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('initializations', () => {
    describe('name', () => {
      let titanic;

      beforeEach(async () => {
        titanic = await Boat.create({
          name: 'RMS Titanic',
          description: 'A ship that cannot be sunk',
          cost: 1001,
        });
      });

      it('returns true if the name is correct', () => {
        expect(titanic.name).to.be.equal('RMS Titanic');
      });

      it('returns false if the cost is incorrect', () => {
        expect(titanic.cost).to.be.equal(1001);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
