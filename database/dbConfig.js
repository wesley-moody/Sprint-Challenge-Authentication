const knex = require("knex");

const knexConfig = require("../knexfile.js");

const env = process.env.NODE_ENV || "dev";

module.exports = knex(knexConfig[env]);
