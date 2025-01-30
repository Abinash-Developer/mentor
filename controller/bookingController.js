const stripe = require('stripe')('sk_test_51NidCYLrsyYxaIR1iN2HAxIKTZvcDWqAYK7DOyamLw091qIlEcYoizpSEfpYQiZcAhfdooawDbJGzxK2e5vJxcz300XjWWIfyE');
const createPaymentIntent = async (req,res)=>{
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
    res.status(500).send({ error: 'Payment creation failed' });
  }
}
module.exports = createPaymentIntent;