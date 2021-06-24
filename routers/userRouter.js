const router = require("express")();
const { validators, verifyToken, authorization } = require("../middleware");
const commonValidator = validators.commonValidator;
const userValidator = validators.userValidator;
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const idControl = authorization.idControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const imageUploadHelper = require("../utils/imageUploadHelper");
const multerOptions = require("../utils/userMulterOptions");
const messages = require("../messages/messages");
const multer = require("multer");
const UserTransactions = require("../database/transactions/userTransactions");
const userTransactions = new UserTransactions();
const upload = multer({ storage: multerOptions });

router.get(
  "/users/:id",
  tokenControl,
  authControl,
  commonValidator.paramId,
  async (req, res) => {
    try {
      const result = await userTransactions.findOne({
        id: parseInt(req.params.id),
      });
      if (result) {
        delete result.Password;
      }
      res.json(result || {});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(messages.serverError);
    }
  }
);

router.get("/chatusers", tokenControl, authControl, async (req, res) => {
  try {
    const result = await userTransactions.vwSelect();
    res.json(result || {});
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(messages.serverError);
  }
});

router.put(
  "/users",
  tokenControl,
  authControl,
  upload.single("profilePhoto"),
  idControl,
  userValidator.checkPass,
  userValidator.update,
  async (req, res) => {
    try {
      if (req.file) {
        imageUploadHelper.update(
          req,
          res,
          "users",
          "profilePhoto",
          userTransactions
        );
      } else {
        const result = await userTransactions.update(
          {
            id: req.decode.userId,
          },
          req.body
        );
        if (!result.affectedRows)
          throw errorSender.errorObject(
            StatusCodes.INTERNAL_SERVER_ERROR,
            messages.userInfoUpdateError
          );
        res.send(messages.userInfoUpdateSuccess);
      }
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
    }
  }
);

module.exports = router;
