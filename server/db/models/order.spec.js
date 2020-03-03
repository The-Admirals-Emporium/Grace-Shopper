const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('validations', () => {
    let order;

    beforeEach(() => {
      order = {
        status: 'COMPLETED',
        shippingAddress: '40 East 80th Street',
      };
    });

    it('status can only be an enum value', async () => {
      order.name = 'NOT-IN-ENUM';
      try {
        const orderStatusNotInEnum = await Order.create(orderStatusNotInEnum);
        if (orderStatusNotInEnum)
          throw Error('Validation should have failed with status not in enum');
      } catch (err) {
        expect(err.message).to.not.have.string('Validation should have failed');
      }
    });
  });
});
