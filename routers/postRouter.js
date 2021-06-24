const fs = require("fs");
const router = require("express")();
const { validators, verifyToken, authorization } = require("../middleware");
const tokenControl = verifyToken.tokenControl;
const authControl = authorization.authControl;
const postValidator = validators.postValidator;
const commonValidator = validators.commonValidator;
const { StatusCodes } = require("http-status-codes");
const { errorSender, parserUtils } = require("../utils");
const imageUploadHelper = require("../utils/imageUploadHelper");
const multerOptions = require("../utils/postMulterOptions");
const multer = require("multer");
const upload = multer({ storage: multerOptions("posts") });
const messages = require("../messages/messages");
const PostTransactions = require("../database/transactions/postTransactions");
const postTransactions = new PostTransactions();

router.get("/posts", tokenControl, postValidator.select, async (req, res) => {
  try {
    const result = await postTransactions.paginatedSelect(
      parserUtils(req.query)
    );

    if (!result)
      throw errorSender.errorObject(StatusCodes.NOT_FOUND, "Veri yok!");

    res.json(result);
  } catch (err) {
    res
      .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .send(messages.serverError);
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
        const result = await postTransactions.insert(
          Object.assign(req.body, {
            postphoto: null,
            userId: req.decode.userId,
          })
        );
        if (!result.affectedRows)
          throw errorSender.errorObject(
            StatusCodes.INTERNAL_SERVER_ERROR,
            messages.postUploadError
          );
        res.send(messages.postUploadSuccess);
      } else {
        imageUploadHelper.insert(
          req,
          res,
          "posts",
          "postphoto",
          postTransactions,
          messages.postUploadError,
          messages.postUploadSuccess
        );
      }
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
    }
  }
);

router.post(
  "/postsbyid",
  tokenControl,
  postValidator.bodyId,
  async (req, res) => {
    try {
      const result = await postTransactions.vwSelect(req.body);
      if (!result)
        throw errorSender.errorObject(StatusCodes.NOT_FOUND, "Veri yok.");

      res.json(result);
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
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
      const photoPath = await postTransactions.vwSelect(req.body);
      if (photoPath.postphoto) {
        fs.unlink(
          photoPath[0].postphoto.replace(
            req.protocol + "://" + req.get("host"),
            `${process.cwd()}/public`
          ),
          (cb) => {}
        );
      }
      const result = await postTransactions.delete(req.body);
      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.GONE,
          "Silmek istediğiniz post bulunamadı."
        );
      res.send("Post silindi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(messages.serverError);
    }
  }
);

module.exports = router;
