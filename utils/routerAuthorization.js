const Roles = require("../models/roles");

module.exports = {
  users: {
    GET: {
      Authorize: [Roles.Root, Roles.Moderator, Roles.User],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Moderator, Roles.User],
    },
  },
  posts: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
  },
  comments: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
  },
  chatusers: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.User],
    },
  },
};
