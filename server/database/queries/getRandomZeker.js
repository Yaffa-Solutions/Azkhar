const dbConnection = require("../config/connection.js");

const getRandomZeker = () => {
  return dbConnection.query(
    `SELECT title, description FROM azkar.zekher
     ORDER BY RANDOM()
     LIMIT 1`
  );
};

module.exports = getRandomZeker;
