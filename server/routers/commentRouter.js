const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken,authorization } = require("../middleware");
const commentTransactions = TransactionsFactory.creating("commentTransactions");
const tokenControl = verifyToken.tokenControl;
const commentValidator = validators.commentValidator;
const commonValidator = validators.commonValidator;
const authControl = authorization.authControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");

router.get("/comments", tokenControl, async (req, res) => {
  try {
    const result = await commentTransactions.vwSelectAsync();
    if (!result) {
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "No data!");
    }
    res.json(result);
  } catch (error) {
    res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.get("/comments/:postId", tokenControl, async (req, res) => {
  try {
    const result = await commentTransactions.vwSelectAsync({
      where: req.params,
    });
    if (!result) {
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "No data!");
    }
    res.json(result);
  } catch (error) {
    res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(error.message);
  }
});

router.post(
  "/comments",
  tokenControl,
  authControl,
  commentValidator.insert,
  async (req, res) => {
    try {
      const result = await commentTransactions.insertAsync(
        Object.assign(req.body, { userId: req.decode.userId })
      );
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Yeni yorum eklenemedi!"
        );
      res.send("Yorumunuz başarıyla eklendi.");
    } catch (err) {
        res
          .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
          .send(err.message);
    }
  }
);

router.delete(
  "/comments",
  tokenControl,
  authControl,
  commonValidator.bodyId,
  async (req, res) => {
    try {
      const result = await commentTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.GONE,
          "Silmek istediğiniz yorum bulunamadı."
        );
      res.send("Yorum silindi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
