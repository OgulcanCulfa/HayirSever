const joi = require("joi");
const {StatusCodes} = require("http-status-codes");

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          EmailAddress: joi.string().email().max(128).required().messages({
            "string.email": "Lütfen geçerli bir Email Adresi giriniz.",
            "string.max": "Email Adresi 128 karakterden büyük olamaz.",
            "string.empty":"Email Adresi boş olamaz"
                }),
          Password: joi.string().max(50).required().messages({
            "string.max": "Parola 50 karakterden büyük olamaz.",
            "string.empty":"Şifre boş olamaz."
                }),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async register(req, res, next) {
    try {
      await joi
        .object({
          Name: joi.string().min(3).max(80).required(),
          Surname: joi.string().min(2).max(50).required(),
          EmailAddress: joi.string().email().max(128).required(),
          Password: joi.string().min(6).max(50).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async delete(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().max(50).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          Name: joi
            .string()
            .min(3)
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          Surname: joi
            .string()
            .min(2)
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$")),
          Password: joi.string().max(50).required(),
          EmailAddress: joi.string().max(128).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async changePassword(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().min(6).max(99).required(),
          NewPassword: joi.string().min(6).max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }

  static async passwordControl(req, res, next) {
    try {
      await joi
        .object({
          Password: joi.string().max(99).required(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(err.message);
    }
  }
}

module.exports = AuthValidator;
