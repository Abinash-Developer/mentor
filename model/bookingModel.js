const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    course_id:{
        type: mongoose.Types.ObjectId,
        required:true,
    },
    user_id:{
        type: mongoose.Types.ObjectId,
        required:true,
    },
    price:{
        type: mongoose.Types.Decimal128,
        required:true,
    },
    payment_token:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});
const BOOKING = mongoose.model('booking',bookingSchema);
module.exports = BOOKING;