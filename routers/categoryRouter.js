const router = require("express")();
const { StatusCodes } = require("http-status-codes");
const CategoryTransactions = require('../database/transactions/categoryTransactions');
const categoryTransactions = new CategoryTransactions();

router.get("/category",async (req,res) => {
    try {
        const result = await categoryTransactions.vwSelect();
        res.json(result);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Kategoriler yüklenemedi.");
    }
})

module.exports = router