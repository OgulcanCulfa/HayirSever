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
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async select(req, res, next) {
    try {
      await joi
        .object({
          category: joi.string().allow('').max(50)
          .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
        })
        .validateAsync(req.query);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
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
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }
  
}
module.exports = PostValidator;
