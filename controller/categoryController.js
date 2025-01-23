const CATEGORY = require('../model/categoryModel');
const createCategory = async (req,res)=>{
    try {
        const insertCategory = new CATEGORY(req.body);
        const categoryResult = await insertCategory.save();
        res.json({
            message: 'Category register success',
            status: true,
            send: (categoryResult)
        })
    } catch (error) {
        res.json({
            message: 'Category register fail',
            status: false,
         })
    }
}
module.exports = {createCategory};