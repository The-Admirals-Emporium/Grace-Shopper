/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Boat = db.model('boat');

describe('Boat model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('initializations', () => {
    describe('basic fields', () => {
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
    }); // end describe basic fields
  }); // end describe initializations

  describe('validations', () => {
    let titanic;

    beforeEach(() => {
      titanic = {
        name: 'RMS Titanic',
        description: 'A ship that cannot be sunk',
        cost: 1001,
      };
    });

    it('name cannot be null or an empty string', async () => {
      titanic.name = null;
      try {
        const emptyNameBoat = await Boat.create(titanic);
        if (emptyNameBoat)
          throw Error('Validation should have failed with empty string');
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed');
      }
    });

    it('boat cost cannot be negative', async () => {
      titanic.cost = -1000.0;
      try {
        const negativePriceBoat = await Boat.create(titanic);
        if (negativePriceBoat)
          throw Error('Validation should have failed with empty string');
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed');
      }
    });
  }); // end describe validations
});
