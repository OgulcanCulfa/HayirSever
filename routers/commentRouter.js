const fs = require("fs");
const router = require("express")();
const { validators, verifyToken, authorization } = require("../middleware");
const tokenControl = verifyToken.tokenControl;
const commentValidator = validators.commentValidator;
const commonValidator = validators.commonValidator;
const authControl = authorization.authControl;
const idControl = authorization.idControl;
const { StatusCodes } = require("http-status-codes");
const { errorSender, parserUtils } = require("../utils");
const imageUploadHelper = require("../utils/imageUploadHelper");
const multerOptions = require("../utils/postMulterOptions");
const multer = require("multer");
const upload = multer({ storage: multerOptions("comments") });
const messages = require("../messages/messages");
const CommentTransactions = require("../database/transactions/commentTransactions");
const commentTransactions = new CommentTransactions

router.get("/comments", tokenControl, async (req, res) => {
  try {
    const result = await commentTransactions.vwSelect();
    if (!result) {
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "Veri yok!");
    }
    res.json(result);
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.serverError);
  }
});

router.get("/comments/:postId", tokenControl, async (req, res) => {
  try {
    const result = await commentTransactions.vwSelect({
      where: req.params,
    });
    if (!result) {
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "Veri yok!");
    }
    res.json(result);
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.serverError);
  }
});

router.post(
  "/comments",
  tokenControl,
  authControl,
  upload.single("photo"),
  commentValidator.insert,
  commonValidator.image,
  async (req, res) => {
    try {
      if (!req.file) {
        const result = await commentTransactions.insert(
          Object.assign(req.body, { userId: req.decode.userId, photo: null })
        );
        if (!result.affectedRows)
          throw errorSender.errorObject(
            StatusCodes.INTERNAL_SERVER_ERROR,
            "Yeni yorum eklenemedi!"
          );
        res.send("Yorumunuz başarıyla eklendi.");
      } else {
        imageUploadHelper.insert(
          req,
          res,
          "comments",
          "photo",
          commentTransactions,
          messages.commentUploadError,
          messages.commentUploadSuccess
        );
      }
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
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
      const photoPath = await commentTransactions.select(
        req.body
      );

      if (photoPath.photo) {
        fs.unlink(
          photoPath.photo.replace(
            req.protocol + "://" + req.get("host"),
            `${process.cwd()}/public`
          ),
          (cb) => {}
        );
      }
      const result = await commentTransactions.delete(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.GONE,
          "Silmek istediğiniz yorum bulunamadı."
        );
      res.send("Yorum silindi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
    }
  }
);

module.exports = router;
