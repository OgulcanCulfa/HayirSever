const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const userTransactions = TransactionsFactory.creating("userTransactions");
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const multerOptions = require("../utils/userMulterOptions");
var multer = require("multer");
var upload = multer({ storage: multerOptions });

router.put(
  "/users",
  tokenControl,
  authControl,
  upload.single("profilephoto"),
  async (req, res) => {
    try {
      const result = await userTransactions.updateAsync(
        {
          profilePhoto:
            req.protocol +
            "://" +
            req.get("host") +
            `/images/users/${req.file.size + req.file.originalname}`,
        },
        { userId: req.decode.userId }
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Yeni profil fotoğrafı eklenemedi!"
        );
      res.send("Yeni profil fotoğrafı başarıyla eklendi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);
