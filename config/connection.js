const mongoose = require('mongoose');
const connectionDB = async ()=>{
    try {
        await mongoose.connect('mongodb+srv://shubham:idO2Lm1Ub9Tzm36i@cluster0.6awju.mongodb.net/mentor');
        console.log("Mongodb Connected.....");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
module.exports = connectionDB;