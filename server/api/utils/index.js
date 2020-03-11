const changeBoatQuantity = async (order, boat, quantity) => {
  await order.addBoat(boat, { through: { quantity: quantity } });

  await order.calculateTotal();

  await order.save();
};

module.exports = { changeBoatQuantity };
