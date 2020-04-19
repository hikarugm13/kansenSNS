const db = require("../models");
const FavoriteTeam = db.favoriteTeam;


checkDuplicateFavoriteTeam = (req, res, next) => {
  // Username
  FavoriteTeam.findOne({
    where: {
      userId: req.body.userId,
      teamId: req.body.teamId,
      teamName: req.body.teamName,
    },
  }).then((team) => {
    if (team) {
      res.status(400).send({
        message: "Failed! already registered",
      });
      return;
    }
  });
};

const verifyFavoriteTeam = {
  checkDuplicateFavoriteTeam: checkDuplicateFavoriteTeam,
};

module.exports = verifyFavoriteTeam;
