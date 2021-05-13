const { errorSender } = require("./errorSender");
const { StatusCodes } = require("http-status-codes");

class ImageUploadHelper {
  constructor() {}

  static async update(req, res, field, transaction) {
    try {
      console.log(transaction);
      const result = await transaction.updateAsync(
        Object.assign(req.body, {
          id: req.decode.userId,
          [field]:
            req.protocol +
            "://" +
            req.get("host") +
            `/images/users/${req.file.originalname}`,
        }),
        { id: req.decode.userId }
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Kullanıcı bilgileri güncellenemedi. Lütfen tekrar deneyiniz."
        );
      res.send("Kullanıcı bilgileri başarıyla güncellendi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }

  static async insert(req, res, field, transaction) {
    try {
      const result = await transaction.insertAsync(
        Object.assign(req.body, {
          userId: req.decode.userId,
          [field]:
            req.protocol +
            "://" +
            req.get("host") +
            `/images/posts/${
              req.body.text.substr(0, 5) + req.file.originalname
            }`,
        })
      );

      if (!result.affectedRows)
        throw errorSender.errorObject(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Yeni post eklenemedi. Lütfen tekrar deneyiniz."
        );
      res.send("Yeni post başarıyla eklendi.");
    } catch (err) {
      res
        .status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(err.message);
    }
  }
}

module.exports = ImageUploadHelper;
