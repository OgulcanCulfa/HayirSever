const joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const messages = require("../../messages/messages");
class CommonValidator {
  constructor() {}

  static async bodyId(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async paramId(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().min(1).required(),
        })
        .validateAsync({ id: parseInt(req.params.id) });
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async image(req, res, next) {
    if (req.file || req.body.text.length > 0) {
      next();
    } else {
      res
        .status(StatusCodes.EXPECTATION_FAILED)
        .send("Gönderi veya Fotoğraf verisinin eklenmesi zorunludur.");
    }
  }
}

module.exports = CommonValidator;
