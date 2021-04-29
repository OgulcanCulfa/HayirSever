const { FadabHelper } = require("fadab-mysql-helper");

class AuthTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tbluser"
  }

  additiveUserTypesAsync(UserTypeName) {
    return queryAsync(
      `SELECT UserTypeName FROM tblUserType WHERE UserTypeNumber<(SELECT UserTypeNumber FROM tblUserType WHERE UserTypeName=?)`,
      [UserTypeName]
    );
  }
}

module.exports = AuthTransactions;
