const createError = require("http-errors");
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//userRouters
const userRouter = require("./routes/userServiceRoute/userRouter");
const userDetailsRouter = require("./routes/userServiceRoute/userDetailsRouter");
const circleRouter = require("./routes/adminServiceRoute/circleRoute");
const circlePincodeRouter = require("./routes/adminServiceRoute/circlePincodeMappingRoute");
const employeeRouter = require("./routes/adminServiceRoute/employeeRoute");
const testRouter = require("./routes/adminServiceRoute/testDetailRoutes");
const slotRouter = require("./routes/adminServiceRoute/slotRoute");
const adminServiceRouter = require("./routes/adminServiceRoute/adminServiceRoute");
const userNotificationRouter = require("./routes/userServiceRoute/userNotificationRoutes");
const userAddressRouter = require("./routes/userServiceRoute/userAddressRoute");
const vehicleEmployeeMappingRouter = require("./routes/AdminServiceRoute/vehicleEmployeeMappingRoute");
const userAddressRouter = require("./routes/userServiceRoute/userAddressRoute")
//vehicleRouter 
const vehicleRouter = require("./routes/adminServiceRoute/vehicleRouter");
const discountPercentageRouter = require("./routes/userServiceRoute/discountPercentageRoute");
const discountAmountRouter = require("./routes/userServiceRoute/discountAmountRoute");
const orderRouter = require("./routes/userServiceRoute/orderRoute");
const cors = require("cors");
const db = require("./config/dbConfig");
const notificationRouter = require("./routes/adminServiceRoute/notificationRoute");
const sampleRouter = require("./routes/AdminServiceRoute/sampleRoute");
const resultRouter = require("./routes/AdminServiceRoute/resultRoute");

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
app.use("/", userDetailsRouter);
app.use("/", userAddressRouter);
app.use("/", circleRouter);
app.use("/", circlePincodeRouter);
app.use("/", employeeRouter);
app.use("/",testRouter);
app.use("/",slotRouter);
app.use("/",notificationRouter);
app.use("/",userNotificationRouter);
app.use("/",vehicleEmployeeMappingRouter)
//vehicleRouter
app.use("/", vehicleRouter);
app.use("/",discountPercentageRouter);
app.use("/",discountAmountRouter);
app.use("/",orderRouter);
//AddressRouter
app.use("/",userAddressRouter);
app.use("/",sampleRouter);
app.use("/",resultRouter);

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