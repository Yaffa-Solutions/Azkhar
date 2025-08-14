const { Pool } = require("pg");
require("dotenv").config({ path: './config.env' });

const connectionString = process.env.DATABASE_URL || "postgres://azkhars:NG4H2QJz30ph3pll0qrfjsMcOSnywBF5@dpg-d2ddi88gjchc73djnid0-a.oregon-postgres.render.com:5432/azkhars";

const options = {
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  },
  max: process.env.DB_MAX_CONNECTIONS || 2,
};

module.exports = new Pool(options);
