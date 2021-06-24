const operations = require('../operations/operations');

class CategoryTransactions {
    constructor() {
        this.table = "tblcategory",
        this.view = "vwcategorieswithcounts";
    }

    vwSelect() {
        return operations.selectAll(this.view);
    }
}

module.exports = CategoryTransactions;

