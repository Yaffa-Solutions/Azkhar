const { Pool } = require("pg");
require("env2")("./config.env");

if (!process.env.DB_URL) throw new Error("No Database URL!!!");

const params = new URL(process.env.DB_URL);
console.log("DB_URL:", params);

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split("/")[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: params.username,
  password: params.password,
  ssl: false,
};

module.exports = new Pool(options);
