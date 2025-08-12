const express = require("express");
const router = express.Router();
const dbConnection = require("../database/config/connection.js");

router.get("/", async (req, res) => {
  const pool = dbConnection;
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM userschema.users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("DB query error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
