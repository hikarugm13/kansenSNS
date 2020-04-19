const db = require("../models");
const Game = db.game;

exports.find = (req, res) => {
  //  console.log(req);
  //  console.log(req.headers);
  const { Op } = require("sequelize");
  Game.findAll({
    where: {
      [Op.or]: [
        { sportsName: req.query.sportsName },
        { level: req.query.level},
        { league: req.query.league },
        { stadiumId: req.query.stadium},
        { gameDate: req.query.date}
      ]
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
exports.findFavoriteTeamGames = (req, res) => {
  const { Op } = require("sequelize");
  Game.findAll({
    where: {
      [Op.or]: [
        { homeTeamId: req.query.teamName },
        { awayTeamId: req.query.teamName }
      ]
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
