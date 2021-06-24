const connection = require("../connection");

const operations = {
  selectAll: (table, selectObj) => {
    let query = `SELECT * FROM ${table} `;
    if (!selectObj === undefined) {
      query += `WHERE ${Object.entries[0]}`;
      return connection.query(query);
    }
    return connection.query(query);
  },
  findOne: (table, selectObj) => {
    return connection.record(table, selectObj);
  },
  insert: (table, insertObj) => {
    return connection.insert(table, insertObj);
  },
  update: (table, where, updateObj) => {
    return connection.update(table, where, updateObj);
  },
  deleteRecord: (table, where) => {
    return connection.delete(table, where);
  },
  customQuery: (query, values) => {
    return connection.query(query, values);
  },
};

module.exports = operations;
