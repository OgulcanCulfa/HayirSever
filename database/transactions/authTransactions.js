const { FadabHelper,queryAsync } = require("fadab-mysql-helper");

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

  login(EmailAddress,Password) {
    return queryAsync(`SELECT * FROM tbluser WHERE EmailAddress = ? AND Password = ?`,[EmailAddress,Password])
  }
}

module.exports = AuthTransactions;
