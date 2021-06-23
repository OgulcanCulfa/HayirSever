const { StatusCodes } = require("http-status-codes");
const CommonValidator = require("./commonValidator");
const joi = require("joi");
const messages = require("../../messages/messages");

class CommentValidator extends CommonValidator {
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
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async insert(req, res, next) {
    try {
      await joi
        .object({
          postId: joi.number().required(),
          text: joi.string().allow(''),
          photo: joi.any()
        })
        .messages({"object.missing":"Gönderi veya Fotoğraf verisinin eklenmesi zorunludur."})
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

}
module.exports = CommentValidator;
