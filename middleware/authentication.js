const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const exception = require("../constants/exception.json");

module.exports = function (req, res, next) {
  try{
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ statusCode:401, message: exception.accessDenied });

    const splitedbearer = token.split(' ');
    const bearerToken = splitedbearer[1];
    const decoded = jwt.verify(bearerToken, jwt_private_key);
    decodedToken = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ statusCode:401, message: exception.invalidToken });
  }
};
