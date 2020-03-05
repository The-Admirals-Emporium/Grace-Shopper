const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};
const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString(),
    });
  });
  app.post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  });
  return app;
};
module.exports = paymentApi;

// Basically on a post request, that you are already doing with axios from your React frontend application, you will use the Stripe library to create a official Stripe payment. The payment creation receives the incoming payload from your frontend application, all the credit card information and optional information, and a callback function that executes after the request to the Stripe API succeeds or fails. Afterward, you can send back a response to your React frontend application.
