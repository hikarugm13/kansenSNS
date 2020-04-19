const authJwt = require('./authJwt')
const verifySignUp = require("./verifySignUp");
const verifyFavoriteTeam = require("./verifyFavoriteTeam");

module.exports = {
  authJwt,
  verifySignUp,
  verifyFavoriteTeam
};