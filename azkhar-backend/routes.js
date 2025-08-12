const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const pool = req.app.get("pool");
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM userschema.users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
