const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'proudction'
    ? process.env.NODE_ENV_PUBLISH_KEY
    : process.env.NODE_ENV_PUBLISH_KEY;

export default STRIPE_PUBLISHABLE;
