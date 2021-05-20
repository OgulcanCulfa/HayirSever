const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const commonValidator = validators.commonValidator;
const userValidator = validators.userValidator;
const userTransactions = TransactionsFactory.creating("userTransactions");
const chatTransactions = TransactionsFactory.creating("chatTransactions");
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const imageUploadHelper = require("../utils/imageUploadHelper");
const multerOptions = require("../utils/userMulterOptions");
var multer = require("multer");
var upload = multer({ storage: multerOptions });

router.get(
  "/users/:id",
  tokenControl,
  authControl,
  commonValidator.paramId,
  async (req, res) => {
    try {
      const result = await userTransactions.findOneAsync({
        id: parseInt(req.params.id),
      });
      if (result) {
        delete result.Password;
      }
      res.json(result || {});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
);

router.get("/chatusers", tokenControl, authControl, async (req, res) => {
  try {
    const result = await userTransactions.vwSelectAsync();
    res.json(result || {});
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.put(
  "/users",
  tokenControl,
  authControl,
  upload.single("profilePhoto"),
  userValidator.update,
  async (req, res) => {
    try {
      if (req.file) {
        imageUploadHelper(req, res, "profilePhoto", userTransactions);
      } else {
        const result = await userTransactions.updateAsync(req.body, {
          id: req.decode.userId,
        });
        if (!result.affectedRows)
          throw errorSender.errorObject(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Kullanıcı bilgileri güncellenemedi. Lütfen tekrar deneyiniz."
          );
        res.send("Kullanıcı bilgileri başarıyla güncellendi.");
      }
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
