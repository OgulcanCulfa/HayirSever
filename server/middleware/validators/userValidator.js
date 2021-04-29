const joi = require("joi");
const HttpStatusCode = require("http-status-codes");
const CommonUserValidator = require("./commonValidator");

class UserValidator extends CommonUserValidator {
  constructor() {}

  static async find(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().min(1).required(),
        })
        .validateAsync({ Id: parseInt(req.params.Id) });
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Id: joi.number().required(),
          FirstName: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          LastName: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          EmailAddress: joi.string().max(200).email(),
          UserTypeName: joi.string(),
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
          FirstName: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          LastName: joi
            .string()
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .required(),
          EmailAddress: joi.string().max(200).email().required(),
          UserTypeName: joi.string().required(),
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(HttpStatusCode.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = UserValidator;
