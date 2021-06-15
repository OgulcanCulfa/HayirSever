const { routerAuthorization } = require("../utils");
const { StatusCodes } = require("http-status-codes");

class Authorization {
  constructor() {}

  static async authControl(req, res, next) {
    try {
      const auth =
        routerAuthorization[req.route.path.split("/")[1].replace("-", "_")][
          req.method
        ].Authorize;
      if (!auth || auth.indexOf(req.decode.UserTypeName) != -1) next();
      else
        res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized transaction.");
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }

  static async limitedAuthControl(req, res, next) {
    try {
      const auth =
        routerAuthorization[req.route.path.split("/")[1].replace("-", "_")][
          req.method
        ].Individual_Transactions;
      if (!auth || auth.indexOf(req.decode.UserTypeName) != -1)
        req.Individual_Transactions = true;
      else req.Individual_Transactions = false;
      next();
    } catch (err) {
      res.status(err.status || 500).send(err.message);
    }
  }
}
module.exports = Authorization;
