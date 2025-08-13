// const express = require("express");
// const router = express.Router();
const dbConnection = require("../config/connection.js");

// router.get("/azkar", (req, res) => {
//   const pool = dbConnection;
//   pool.query("SELECT id, title, description, is_fav FROM azkar.zekher")
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(error => {
//       console.error("DB query error:", error);
//       res.status(500).json({ error: error.message || "Internal Server Error" });
//     });
// });
const getZeker = () =>{
    return dbConnection.query(`SELECT id, title, description, is_fav FROM azkar.zekher`)
}

module.exports = { getZeker };