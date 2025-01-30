const BATCH = require("../model/batchModel");

const createBatch = async (req,res)=>{
 try {
    console.log(req.body);
    const batchObj = new BATCH(req.body);
    const batchres = await batchObj.save();
    return res.json({
        message: "Batch created successfully",
        status: true,
        send: batchres,
      });
 } catch (error) {
    return res.json({
        message: "Batch created failed",
        status: false,
      });
 }
}
module.exports = {createBatch};