const { FadabHelper, selectAsync } = require("fadab-mysql-helper");

class CategoryTransactions extends FadabHelper{
  constructor() {
    super();
    this.baseTable = "tblcategory";
    this.vwName = "vwcategorieswithcounts";
  }

  vwSelectAsync() {
    return selectAsync(this.vwName);
  }
}

module.exports = CategoryTransactions;
