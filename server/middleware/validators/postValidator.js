const { StatusCodes } = require("http-status-codes");
const CommonValidator = require("./commonValidator");
const joi = require("joi");

class PostValidator extends CommonValidator {
  constructor() {}
  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          text: joi.string(),
          photo: joi.string(),
        })
        .or("text","photo")
        .messages({"object.missing":"Gönderi veya Fotoğraf verisi zorunludur."})
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async select(req, res, next) {
    try {
      await joi
        .object({
          limit: joi.number(),
          offset: joi.number(),
        })
        .with("offset", "limit")
        .validateAsync(req.query);
      next();
    } catch (err) {
      res.status(HttpStatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }
}
module.exports = PostValidator;
