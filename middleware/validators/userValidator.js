const joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const CommonUserValidator = require("./commonValidator");
const messages = require("../../messages/messages");

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
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async update(req, res, next) {
    try {
      await joi
        .object({
          id: joi.number().required(),
          Name: joi
            .string()
            .min(2)
            .max(80)
            .pattern(new RegExp("^[ A-Za-zÇçÖöŞşÜüĞğİı]+$"))
            .messages({
              "string.pattern.base":
                "İsim yalnızca büyük ya da küçük harf içerebilir.",
              "string.max": "İsim 80 karakterden büyük olamaz.",
              "string.min": "İsim minimum 2 karakter olmalıdır.",
              "string.empty": "İsim boş olamaz",
            }),
          Surname: joi
            .string()
            .min(2)
            .max(100)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı ]+$"))
            .messages({
              "string.pattern.base":
                "Soyad yalnızca büyük ya da küçük harf içerebilir.",
              "string.max": "Soyad 128 karakterden büyük olamaz.",
              "string.min": "Soyad minimum 2 karakter olmalıdır.",
              "string.empty": "Soyad boş olamaz",
            }),
          EmailAddress: joi.string().max(128).email().messages({
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
              "string.empty": "Parola 6 karakterden küçük olamaz.",
              "string.max": "Parola 50 karakterden büyük olamaz.",
            }),
          mobile: joi
            .string()
            .allow("")
            .min(10)
            .max(11)
            .pattern(new RegExp("^[0-9]+$"))
            .messages({
              "string.pattern.base":
                "Telefon numarası yalnızca sayı içerebilir.",
              "string.max": "Telefon numarası maksimum 11 karakter olmalıdır.",
              "string.min": "Telefon numarası minimum 10 karakter olmalıdır.",
            }),
          address: joi
            .string()
            .allow("")
            .pattern(new RegExp("^[- A-Za-zÇçÖöŞşÜüĞğİı0-9.:,/()]+$"))
            .messages({
              "string.pattern.base":
                "Adres yalnızca (/,.:-) karakterleri,harf ve sayı içerebilir.",
              "string.min": "Telefon numarası minimum 10 karakter olmalıdır.",
            }),
          city: joi
            .string()
            .max(25)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı]+$"))
            .messages({
              "string.pattern.base": "İl yalnızca harf içerebilir.",
              "string.max": "İl maksimum 25 karakter olmalıdır.",
              "string.empty": "İl bilgisinin girilmesi zorunludur.",
            }),
          district: joi
            .string()
            .max(50)
            .pattern(new RegExp("^[A-Za-zÇçÖöŞşÜüĞğİı]+$"))
            .messages({
              "string.pattern.base": "İlçe yalnızca harf içerebilir.",
              "string.max": "İlçe maksimum 50 karakter olmalıdır.",
              "string.empty": "İlçe bilgisinin girilmesi zorunludur.",
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
          website: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Website adresi yalnızca /, : , harf ve sayı içerebilir.",
              "string.max": "Website adresi maksimum 80 karakter olmalıdır.",
            }),
          github: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Github adresi yalnızca /, : , harf ve sayı içerebilir.",
              "string.max": "Github adresi maksimum 80 karakter olmalıdır.",
            }),
          twitter: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Twitter adresi yalnızca /,:  harf ve sayı içerebilir.",
              "string.max": "Twitter adresi maksimum 80 karakter olmalıdır.",
            }),
          instagram: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Instagram adresi yalnızca /,:  harf ve sayı içerebilir.",
              "string.max": "Instagram adresi maksimum 80 karakter olmalıdır.",
            }),
          facebook: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Facebook adresi yalnızca /,:  harf ve sayı içerebilir.",
              "string.max": "Facebook adresi maksimum 80 karakter olmalıdır.",
            }),
          kaggle: joi
            .string()
            .allow("")
            .max(80)
            .pattern(new RegExp("^[A-Za-z0-9-/:.]+$"))
            .messages({
              "string.pattern.base":
                "Facebook adresi yalnızca /,:  harf ve sayı içerebilir.",
              "string.max": "Facebook adresi maksimum 80 karakter olmalıdır.",
            }),
          profilePhoto: joi.any(),
        })
        .validateAsync(req.body);
      next();
    } catch (err) {
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }

  static async checkPass(req, res, next) {
    const { Password } = await req.body;
    if (!Password || Password.length === 0) {
      delete req.body.Password;
      next();
    } else {
      next();
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
      res.status(StatusCodes.EXPECTATION_FAILED).send(messages.serverError);
    }
  }
}

module.exports = UserValidator;
