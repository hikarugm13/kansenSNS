const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const gameController = require("../controllers/game.controller");
const reviewController = require("../controllers/review.controller");
const imgController = require("../controllers/img.controller");
const teamController = require("../controllers/team.controller");
const favoriteTeamController = require("../controllers/favoriteTeam.controller");
const stadiumController = require("../controllers/stadium.controller");

//middleware
const { authJwt } = require("../middleware");
const { verifyFavoriteTeam } = require("../middleware");

module.exports = function (app) {
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/user", [authJwt.verifyToken], userController.find);

  app.post(
    "/api/auth/updateProfile",
    [authJwt.verifyToken],
    userController.updateProfile
  );

  app.get(
    "/api/auth/findGame",
    // [authJwt.verifyToken],
    gameController.find
  );
  app.get(
    "/api/auth/findTeamReview",
    // [authJwt.verifyToken],
    gameController.findTeamReview
  );
  app.get(
    "/api/auth/findFavoriteTeamGames",
    // [authJwt.verifyToken],
    gameController.findFavoriteTeamGames
  );
  app.get(
    "/api/auth/findGameDetail",
    // [authJwt.verifyToken],
    gameController.findGameDetail
  );
  app.post(
    "/api/auth/postReview",
    [authJwt.verifyToken],
    reviewController.postReview
  );
  app.post(
    "/api/auth/postImage",
    // [authJwt.verifyToken],
    imgController.postImage
  );
  app.post(
    "/api/auth/updateReview",
    [authJwt.verifyToken],
    reviewController.updateReview
  );
  app.post(
    "/api/auth/deleteReview",
    [authJwt.verifyToken],
    reviewController.deleteReview
  );
  app.get(
    "/api/auth/getGameReview",
    // [authJwt.verifyToken],
    reviewController.getGameReview
  );

  app.get(
    "/api/auth/getAllReview",
    // [authJwt.verifyToken],
    reviewController.getAllReview
  );
  app.get(
    "/api/auth/showMyReview",
    [authJwt.verifyToken],
    reviewController.getMyReview
  );
  app.get(
    "/api/auth/showReviewDetail",
    // [authJwt.verifyToken],
    reviewController.showReviewDetail
  );
  app.get(
    "/api/auth/getTeamInfo",
    // [authJwt.verifyToken],
    teamController.getTeamInfo
  );
  app.post(
    "/api/auth/registerTeam",
    [verifyFavoriteTeam.checkDuplicateFavoriteTeam],
    favoriteTeamController.registerTeam
  );
  app.get(
    "/api/auth/findFavoriteTeam",
    // [authJwt.verifyToken],
    favoriteTeamController.findFavoriteTeam
  );
  app.get(
    "/api/auth/findStadiumDetail",
    // [authJwt.verifyToken],
    stadiumController.findStadiumDetail
  );
  app.get(
    "/api/auth/findStadiumReview",
    // [authJwt.verifyToken],
    gameController.findStadiumReview
  );
};
