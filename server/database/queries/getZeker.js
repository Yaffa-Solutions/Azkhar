const dbConnection = require("../config/connection.js");

const getZeker = () => {
  return dbConnection.query(
    `SELECT id, title, description, is_fav,category,counter FROM azkar.zekher`
  );
};


module.exports = { getZeker };
