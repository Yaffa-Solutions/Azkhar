const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config/connection");
const router = require("./controllers");
// const azkar = require("./controllers/adamin");

const app = express();
app.use(express.json());
app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use( router);




module.exports = app;
