const { StatusCodes } = require("http-status-codes");
const CommonValidator = require("./commonValidator");
const joi = require("joi");
const messages = require("../../messages/messages");
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
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          categoryId: joi.number().required(),
          text: joi.string(),
          postphoto: joi.any(),
        })
        .or("text", "postphoto")
        .messages({
          "object.missing": "Gönderi veya Fotoğraf verisi zorunludur.",
          "string.empty": "Metin girilmesi zorunludur.",
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async select(req, res, next) {
    try {
      await joi
        .object({
          categoryId: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[0-9undefined]+$")),
          offset: joi.number(),
        })
        .validateAsync(req.query);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async bodyId(req, res, next) {
    try {
      await joi
        .object({
          postUserId: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }
}
module.exports = PostValidator;
