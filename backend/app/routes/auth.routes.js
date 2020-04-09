const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const gameController = require("../controllers/game.controller");
const reviewController = require("../controllers/review.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/user", [authJwt.verifyToken], userController.find);
  app.get("/api/auth/findGame", [authJwt.verifyToken], gameController.find);
  app.get("/api/auth/findGameDetail", [authJwt.verifyToken], gameController.findGameDetail);
  app.post(
    "/api/auth/postReview",
    [authJwt.verifyToken],
    reviewController.postReview
  );
  app.get(
    "/api/auth/showReview",
    [authJwt.verifyToken],
    reviewController.getReview
  );
};