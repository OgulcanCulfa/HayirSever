const { routerAuthorization } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const messages = require("../messages/messages");

class Authorization {
  constructor() {}

  static async idControl(req, res, next) {
    try {
      if (parseInt(req.body.id) === parseInt(req.decode.userId)) next();
      else {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Bu işlemi yapmaya yetkiniz yok.");
      }
    } catch (err) {
      res.status(err.status || 500).send(messages.serverError);
    }
  }

  static async authControl(req, res, next) {
    try {
      const auth =
        routerAuthorization[req.route.path.split("/")[1].replace("-", "_")][
          req.method
        ].Authorize;
      if (!auth || auth.indexOf(req.decode.UserTypeName) != -1) next();
      else
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Bu işlemi yapmaya yetkiniz yok.");
    } catch (err) {
      res.status(err.status || 500).send(messages.serverError);
    }
  }
}
module.exports = Authorization;
