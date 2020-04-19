const db = require("../models");
const FavoriteTeam = db.favoriteTeam;

exports.registerTeam = (req, res) => {
  FavoriteTeam.create({
    userId: req.body.userId,
    teamId: req.body.teamId,
    teamName: req.body.teamName,
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your review was posted successfully!" });
};

exports.findFavoriteTeam = (req, res) => {
  //  console.log(req);
  //  console.log(req.headers);
  FavoriteTeam.findAll({
    where: {
      userId: req.query.userId,
    },
  }).then((favoriteTeam) => {
    if (!favoriteTeam) {
      return res.status(404).send({ message: "favoriteTeam Not found." });
    }
    return res.status(200).json({
      favoriteTeam,
    });
  });
};
