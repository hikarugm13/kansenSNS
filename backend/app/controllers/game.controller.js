const db = require("../models");
const Game = db.game;

exports.find = (req, res) => {
  //  console.log(req);
  //  console.log(req.headers);
  Game.findAll({
    where: {
      sportsName: req.query.sportsName
    }
  }).then(game => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game
    });
  });
};

exports.findGameDetail = (req, res) => {
  console.log(req.query.id);
  //  console.log(req.headers);
  Game.findOne({
    where: {
      id: req.query.id
    }
  }).then(game => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game
    });
  });
};
