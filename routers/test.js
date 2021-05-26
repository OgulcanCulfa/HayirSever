const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const userTransactions = TransactionsFactory.creating("userTransactions");

// router.get("/test", async (req, res) => {
//   try {
    
//     const result = await userTransactions.selectAsync();
//     res.status(StatusCodes.OK).send(result);
//   } catch(err) {
//     if (err) throw err;
//   }
// });

module.exports = router;
