const joi = require("joi");
const { StatusCodes } = require("http-status-codes");

class AuthValidator {
  constructor() {}

  static async login(req, res, next) {
    try {
      await joi
        .object({
          EmailAddress: joi.string().email().max(128).required().messages({
            "string.email": "Lütfen geçerli bir Email Adresi giriniz.",
            "string.max": "Email Adresi 128 karakterden büyük olamaz.",
            "string.empty": "Email Adresi boş olamaz",
          }),
          Password: joi
            .string()
            .min(6)
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı0-9]+$"))
            .messages({
              "string.pattern.base":
                "Parola yalnızca harf ve rakam içerebilir.",
              "string.min": "Parola 6 karakterden küçük olamaz.",
              "string.max": "Parola 50 karakterden büyük olamaz.",
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
          Name: joi
            .string()
            .min(2)
            .max(80)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı]+$"))
            .messages({
              "string.pattern.base":
                "İsim yalnızca büyük ya da küçük harf içerebilir.",
              "string.max": "İsim 128 karakterden büyük olamaz.",
              "string.min": "İsim minimum 3 karakter olmalıdır.",
              "string.empty": "İsim boş olamaz",
            }),
          Surname: joi
            .string()
            .min(2)
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı0-9]+$"))
            .messages({
              "string.pattern.base":
                "Soyad yalnızca büyük ya da küçük harf içerebilir.",
              "string.max": "Soyad 128 karakterden büyük olamaz.",
              "string.min": "Soyad minimum 2 karakter olmalıdır.",
              "string.empty": "Soyad boş olamaz",
            }),
          department: joi
            .string()
            .max(80)
            .pattern(new RegExp("^[ A-Za-zÇçÖöŞşÜüĞğİı]+$"))
            .messages({
              "string.pattern.base": "Bölüm yalnızca harf içerebilir.",
              "string.max": "Bölüm maksimum 80 karakter olmalıdır.",
              "string.empty": "Bölüm bilgisinin girilmesi zorunludur.",
            }),
          classNum: joi.number().min(1).max(6).messages({
            "number.base": "Sınıf değeri sadece sayı olabilir.",
            "number.max": "Sınıf 6'dan büyük olamaz.",
            "number.min": "Sınıf 1'den küçük olamaz.",
            "number.empty": "Sınıf bilgisinin girilmesi zorunludur.",
          }),
          EmailAddress: joi.string().email().max(128).required().messages({
            "string.email": "Lütfen geçerli bir Email Adresi giriniz.",
            "string.max": "Email Adresi 128 karakterden büyük olamaz.",
            "string.empty": "Email Adresi boş olamaz",
          }),
          Password: joi
            .string()
            .min(6)
            .max(50)
            .required()
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı0-9]+$"))
            .messages({
              "string.pattern.base":
                "Parola yalnızca harf ve rakam içerebilir.",
              "string.min": "Parola 6 karakterden küçük olamaz.",
              "string.max": "Parola 50 karakterden büyük olamaz.",
            }),
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
