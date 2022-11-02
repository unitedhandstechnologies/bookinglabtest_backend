const createError = require("http-errors");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//userRouters
const userRouter = require("./routes/UserServiceRoute/userRouter");
const circleRouter = require("./routes/adminServiceRoute/circleRoute");
const circlePincodeRouter = require("./routes/adminServiceRoute/circlePincodeMappingRoute");
const testRouter = require("./routes/adminServiceRoute/testDetailRoutes");

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

//userRouters
app.use("/", userRouter);
app.use("/", circleRouter);
app.use("/", circlePincodeRouter)
app.use("/",testRouter);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development  
    res.locals.message = err.message;  
    res.locals.error = req.app.get("env") === "development" ? err : {};  
  
    // render the error page  
    res.status(err.status || 500);  
    res.render("error");  
  });  
  
app.listen({ port: 5000 }, async () => {  
    console.log("Server is listen on http://localhost:5000");  
    // await sequelize.authenticate();  
    console.log("Database Connected");  
  });

module.exports = app;