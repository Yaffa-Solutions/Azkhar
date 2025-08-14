const express = require("express");
const router = express.Router();
const dbConnection = require("../database/config/connection.js");
const getZeker = require("../database/queries/getZeker.js");

router.get("/", (req, res) => {
  const pool = dbConnection;
  pool
    .query("SELECT id, username, email FROM userschema.users")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error("DB query error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    });
});
console.log("here");

router.get("/zeker", (req, res) => {
  console.log("in ");

  getZeker
    .getZeker()
    .then((result) => {
      console.log("Query success:", result.rows.length);
      return res.json(result.rows);
    })
    .catch((error) => {
      console.error("DB query error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Internal Server Error" });
    });
});

router.get("/zeker/:id", (req, res) => {
  const id = req.params.id;
  dbConnection
    .query(
      `SELECT title, description, is_fav FROM azkar.zekher WHERE id = $1`,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Zeker not found" });
      }
      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error fetching task:", err);
      return res.status(500).json({ error: "Failed to fetch task" });
    });
});

router.get("/tasks", (req, res) => {
  dbConnection
    .query("SELECT * FROM task")
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    });
});

router.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  dbConnection
    .query("SELECT * FROM task WHERE id = $1", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error fetching task:", err);
      return res.status(500).json({ error: "Failed to fetch task" });
    });
});

router.post("/tasks", (req, res) => {
  const { user_id, zekher_id, title, due_date, is_done, target_count } =
    req.body;
  const query = `
    INSERT INTO task (user_id, zekher_id, title, due_date, is_done, target_count)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  dbConnection
    .query(query, [user_id, zekher_id, title, due_date, is_done, target_count])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((err) => {
      console.error("Error creating task:", err);
      return res.status(500).json({ error: "Failed to create task" });
    });
});
router.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const { user_id, zekher_id, title, due_date, is_done, target_count } =
    req.body;
  const query = `
    UPDATE task
    SET user_id=$1, zekher_id=$2, title=$3, due_date=$4, is_done=$5, target_count=$6
    WHERE id=$7 RETURNING *;
  `;
  dbConnection
    .query(query, [
      user_id,
      zekher_id,
      title,
      due_date,
      is_done,
      target_count,
      id,
    ])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error updating task:", err);
      return res.status(500).json({ error: "Failed to update task" });
    });
});

router.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  dbConnection
    .query("DELETE FROM task WHERE id = $1 RETURNING *;", [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      return res.json({ message: "Task deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
      return res.status(500).json({ error: "Failed to delete task" });
    });
});

router.get("/articles", (req, res) => {
  dbConnection
    .query(
  //     `
  //   SELECT a.*, u.username AS author
  //   FROM public.article a
  //   LEFT JOIN userschema.users u ON a.author_id = u.id
  // `
  `SELECT * FROM public.article`
    )
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("Error fetching articles:", err);
      return res.status(500).json({ error: "Failed to fetch articles" });
    });
});

router.get("/articles/:id", (req, res) => {
  const articleId = req.params.id;
  dbConnection
    .query(`SELECT * FROM public.article WHERE id = $1`, [articleId])
    .then((result) => {
      if (result.rows.length === 0)
        return res.status(404).json({ error: "Article not found" });
      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error fetching article:", err);
      return res.status(500).json({ error: "Failed to fetch article" });
    });
});

router.put("/zeker/:id/counter", (req, res) => {
  const { increment } = req.body;
  const id = req.params.id;

  const query = `
    UPDATE azkar.zekher
    SET counter = counter + $1
    WHERE id = $2
    RETURNING id, title, description, category, counter, is_fav;
  `;
  const value = increment ? 1 : -1;

  dbConnection
    .query(query, [value, id])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Zeker not found" });
      }
      return res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("Error updating counter:", err);
      return res.status(500).json({ error: "Failed to update counter" });
    });
});

module.exports = router;
