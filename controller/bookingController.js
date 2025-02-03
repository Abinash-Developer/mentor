const { default: mongoose } = require('mongoose');
const USER = require('../model/userModel');
const stripe = require('stripe')('sk_test_51NidCYLrsyYxaIR1iN2HAxIKTZvcDWqAYK7DOyamLw091qIlEcYoizpSEfpYQiZcAhfdooawDbJGzxK2e5vJxcz300XjWWIfyE');
const createPaymentIntent = async (req,res)=>{
  try {
    const student = await USER.findOne({_id: new mongoose.Types.ObjectId(req.body.userId)});
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
      });
      res.send({
        ...student.toObject(),
        clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
    res.status(500).send({ error: 'Payment creation failed' });
  }
}
const createBookingDetails = async (req,res)=>{
  console.log(req.body);
}
module.exports = {createPaymentIntent,createBookingDetails};