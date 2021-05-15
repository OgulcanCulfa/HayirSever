const router = require("express")();
const TransactionsFactory = require("../database/transactionFactory");
const { validators, verifyToken, authorization } = require("../middleware");
const postTransactions = TransactionsFactory.creating("postTransactions");
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const postValidator = validators.postValidator;
const commonValidator = validators.commonValidator;
const { StatusCodes } = require("http-status-codes");
const { errorSender } = require("../utils");
const { parserUtils } = require("../utils");
const imageUploadHelper = require("../utils/imageUploadHelper");
const multerOptions = require("../utils/postMulterOptions");
const multer = require("multer");
const upload = multer({ storage: multerOptions("posts") });

router.get("/posts", tokenControl, postValidator.select, async (req, res) => {
  try {
    const result = await postTransactions.vwSelectAsync(parserUtils(req.query));

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
  upload.single("postphoto"),
  postValidator.insert,
  commonValidator.image,
  async (req, res) => {
    try {
      if (!req.file) {
        const result = await postTransactions.insertAsync(
          Object.assign(req.body, {
            userId: req.decode.userId,
            categoryId: req.query.categoryId
          })
        );
        if (!result.affectedRows)
          throw errorSender.errorObject(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Yeni post eklenemedi. Lütfen tekrar deneyiniz."
          );
        res.send("Yeni post başarıyla eklendi.");
      } else {
        imageUploadHelper.insert(req, res, "postphoto", postTransactions);
      }
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);


router.post(
  "/postsbyid",
  tokenControl,
  postValidator.bodyId,
  async (req, res) => {
    try {
      const result = await postTransactions.vwSelectAsync({ where: req.body });
      if (!result)
        throw errorSender.errorObject(StatusCodes.NOT_FOUND, "No data!");

      res.json(result);
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

router.delete(
  "/posts",
  tokenControl,
  authControl,
  commonValidator.bodyId,
  async (req, res) => {
    try {
      const result = await postTransactions.deleteAsync(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.GONE,
          "Silmek istediğiniz post bulunamadı."
        );
      res.send("Post silindi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
);

module.exports = router;
