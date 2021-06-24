const operations = require('../operations/operations');

class AuthTransactions {
    constructor() {
        this.table = "tbluser"
    }

    findOne(selectObj) {
        return operations.findOne(this.table, selectObj)
    }

    insert(insertObj) {
        return operations.insert(this.table, insertObj);
    }

}

module.exports = AuthTransactions;