const { routerAuthorization } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const TransactionsFactory = require("../database/transactionFactory");
const authTransactions = TransactionsFactory.creating("authTransactions");

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
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send("Unauthorized transaction.");
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }

  static async userStatusAuthControl(req, res, next) {
    try {
      const result = await authTransactions.additiveUserTypesAsync(
        req.decode.UserTypeName
      );
      if (
        result.findIndex(
          (statusName) => statusName.UserTypeName == req.body.UserTypeName
        ) === -1
      ) {
        res
          .status(StatusCodes.UNAUTHORIZED)
          .send(
            "Unauthorized transaction! You cannot do any action on this user type."
          );
      } else next();
    } catch (error) {
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(error.message);
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
    } catch (error) {
      res.status(error.status || 500).send(error.message);
    }
  }
}

module.exports = Authorization;
