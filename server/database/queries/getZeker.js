// const express = require("express");
// const router = express.Router();
const dbConnection = require("../config/connection.js");

const getZeker = () =>{
    return dbConnection.query(`SELECT id, title, description, is_fav FROM azkar.zekher`)
}

module.exports = { getZeker };