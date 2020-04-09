const jwt = require('jsonwebtoken')
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  // const bearToken = req.headers["authorization"];
  // const bearer = bearToken.split(" ");
  // const token = bearer[1];
  let token = req.headers.token;

  if (!token) {
    return res.status(403).send({
      message:"no token provided"
    })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message:"unauthorized"
      })
    }
    req.id = decoded.id;
       
    next()
  })
}

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;