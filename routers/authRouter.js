const router = require("express")();
const jwt = require("jsonwebtoken");
const TransactionsFactory = require("../database/transactionFactory");
const { validators } = require("../middleware");
const authTransactions = TransactionsFactory.creating("authTransactions");
const authValidator = validators.authValidator;
const { StatusCodes } = require("http-status-codes");
const messages = require("../messages/messages");

router.post("/login", authValidator.login, async (req, res) => {
  try {
    const result = await authTransactions.findOneAsync({
      EmailAddress: req.body.EmailAddress,
      Password: req.body.Password,
    });
    if (!result) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send("E-mail adresi veya parolanız yanlış. Lütfen tekrar deneyiniz.");
    } else {
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
    }
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.serverError);
  }
});

router.post("/register", authValidator.register, async (req, res) => {
  try {
    const result = await authTransactions.findOneAsync({
      EmailAddress: req.body.EmailAddress,
    });
    if (result) {
      res.status(StatusCodes.CONFLICT).send("Zaten sisteme kayıtlısınız.");
    } else {
      authTransactions.insertAsync(req.body);
      res.send("Başarılı bir şekilde kaydınız gerçekleşti. Giriş yapabilirsiniz.");
    }
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.serverError);
  }
});

module.exports = router;
