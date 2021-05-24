const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken } = require("../middleware");
const authTransactions = TransactionsFactory.creating("authTransactions");
const authValidator = validators.authValidator;
const tokenControl = verifyToken.tokenControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");

router.post("/login", authValidator.login, async (req, res) => {
  try {
    const result = await authTransactions.findOneAsync({
      EmailAddress: req.body.EmailAddress,
      Password: req.body.Password,
    });
    if (!result)
      throw errorSender.errorObject(
        StatusCodes.BAD_REQUEST,
        "E-mail adresi veya parolanız yanlış. Lütfen tekrar deneyiniz."
      );

    const payload = {
      userId: result.id,
      Name: result.Name,
      Surname: result.Surname,
      UserTypeName: result.UserTypeName,
    };
    const token = jwt.sign(payload, req.app.get("api_key"), {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.post("/register", authValidator.register, async (req, res) => {
  try {
    const result = await authTransactions.findOneAsync({
      EmailAddress: req.body.EmailAddress,
    });
    if (result) {
      throw errorSender.errorObject(
        StatusCodes.CONFLICT,
        "Zaten sisteme kayıtlısınız."
      );
    } else {
      authTransactions.insertAsync(req.body);
      res.send(
        "Başarılı bir şekilde"
      );
    }
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message);
  }
});

router.delete(
  "/my-account",
  tokenControl,
  authValidator.delete,
  async (req, res) => {
    try {
      const result = await commonTransactions.deleteAsync(
        Object.assign(req.body, {
          Id: req.decode.UserID,
        })
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your account has been deleted.");
    } catch (error) {
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/my-account",
  tokenControl,
  authValidator.update,
  async (req, res) => {
    try {
      const result = await commonTransactions.updateAsync(req.body, {
        Id: req.decode.UserID,
        Password: req.body.Password,
      });

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your account information has been successfully edited.");
    } catch (error) {
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.put(
  "/change-password",
  tokenControl,
  authValidator.changePassword,
  async (req, res) => {
    try {
      const result = await commonTransactions.updateAsync(
        { Password: req.body.NewPassword },
        {
          Id: req.decode.UserID,
          Password: req.body.Password,
        }
      );
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.BAD_REQUEST,
          "Wrong password !"
        );
      res.json("Your password has been changed.");
    } catch (error) {
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.post(
  "/password-control",
  tokenControl,
  authValidator.passwordControl,
  async (req, res) => {
    try {
      const result = await commonTransactions.findOneAsync({
        Id: req.decode.UserID,
        Password: req.body.Password,
      });
      if (!result)
        throw errorSender.errorObject(
          StatusCodes.BAD_REQUEST,
          "Wrong password !"
        );

      res.json("Password is correct.");
    } catch (error) {
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(error.message);
    }
  }
);

router.get("/token-decode", tokenControl, async (req, res) => {
  res.json(req.decode);
});

module.exports = router;
