const { selectAll } = require("../operations/operations");

class CategoryTransactions {
  constructor() {
    this.table = "tblcategory"; 
    this.view = "vwcategorieswithcounts";
  }

  vwSelect() {
    return selectAll(this.view);
  }
}

module.exports = CategoryTransactions;
