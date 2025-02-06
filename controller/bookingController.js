const { default: mongoose } = require('mongoose');
const USER = require('../model/userModel');
const BOOKING = require('../model/bookingModel');
const stripe = require('stripe')('sk_test_51NidCYLrsyYxaIR1iN2HAxIKTZvcDWqAYK7DOyamLw091qIlEcYoizpSEfpYQiZcAhfdooawDbJGzxK2e5vJxcz300XjWWIfyE');

const createPaymentIntent = async (req,res)=>{
  try {
    const student = await USER.findOne({_id: new mongoose.Types.ObjectId(req.body.userId)},{ name:0,email:0,image:0,password:0,role:0,status:0,createdAt:0,updatedAt:0 });
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body?.price * 100,
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
  try {
    const bookingRes = new BOOKING(req.body);
    const bookres = await bookingRes.save();
    res.json({
      message:"Booking saved sucessfully",
      status:true,
      send:(bookres)
    })
  } catch (error) {
    res.json({
      message:"Booking not saved",
      status:false
    })
  }
}
module.exports = {createPaymentIntent,createBookingDetails};