const Roles = require("../models/roles");

module.exports = {
  user: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
  },
  competition: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    DELETE: {
      Individual_Transactions: [Roles.Manager],
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    PUT: {
      Individual_Transactions: [Roles.Manager],
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
  },
  posts: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator,Roles.User],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator,Roles.User],
    },
  },
  comments: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
  },
};
