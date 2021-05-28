const joi = require("joi");
const { StatusCodes } = require("http-status-codes");

class CommonValidator {
  constructor() {}

  static async limitAndOffset(req, res, next) {
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
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async bodyId(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
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
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
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
