const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config/connection");
const router = require("./controllers");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "pages")));
// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "..", "pages", "index.html"));
// // });
// app.use("/", router);
// app.use( router);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../pages/index.html"));
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "pages", "index.html"));
});
app.use("/", router);

app.set("port", process.env.PORT || 3000);

module.exports = app;
