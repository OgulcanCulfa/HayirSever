const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken,authorization } = require("../middleware");
const postTransactions = TransactionsFactory.creating("postTransactions");
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl
const postValidator = validators.postValidator;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");

router.get("/posts", tokenControl, postValidator.select, async (req, res) => {
  try {
    const result = await postTransactions.vwSelectAsync();
    if (!result)
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "No data!");

    res.json(result);
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.post(
  "/posts",
  tokenControl,
  authControl,
  postValidator.insert,
  async (req, res) => {
    try {
      const result = await postTransactions.insertAsync(
        Object.assign(req.body, { userId: req.decode.userId })
      );
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Yeni post eklenemedi!"
        );
      res.send("Yeni post başarıyla eklendi." );
    } catch (err) {
        res
          .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

module.exports = router;
