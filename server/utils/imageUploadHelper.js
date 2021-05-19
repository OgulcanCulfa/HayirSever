const { errorSender } = require("./errorSender");
const { StatusCodes } = require("http-status-codes");

class ImageUploadHelper {
  constructor() {}

  static async update(req, res, to, field, transaction) {
    try {
      const result = await transaction.updateAsync(
        Object.assign(req.body, {
          id: req.decode.userId,
          [field]:
            req.protocol +
            "://" +
            req.get("host") +
            `/images/${to}/${req.file.originalname}`,
        }),
        { id: req.decode.userId }
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          errMsg
        );
      res.send(successMsg);
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }

  static async insert(req, res, to, field, transaction, errMsg, successMsg) {
    try {
      const result = await transaction.insertAsync(
        Object.assign(req.body, {
          userId: req.decode.userId,
          [field]:
            req.protocol +
            "://" +
            req.get("host") +
            `/images/${to}/${
              req.body.text.substr(0, 5) + req.file.originalname
            }`,
        })
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          errMsg
        );
      res.send(successMsg);
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
}

module.exports = ImageUploadHelper;
