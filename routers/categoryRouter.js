const router = require("express")();
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const TransactionsFactory = require("../database/transactionFactory");
const categoryTransactions = TransactionsFactory.creating("categoryTransactions");

router.get("/category",async (req,res) => {
    try {
        const result = await categoryTransactions.vwSelectAsync()
        res.json(result);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Kategoriler yüklenemedi.");
    }
})

module.exports = router