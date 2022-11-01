const createError = require("http-errors");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


const cors = require("cors");
const db = require("./config/dbConfig");

db.connect();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());

// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


module.exports = app;