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
        { level: req.query.level },
        { league: req.query.league },
        { stadiumName: req.query.stadium },
        { gameDate: req.query.date },
      ],
    },
  }).then((game) => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game,
    });
  });
};
// TOPページ用
exports.findNewGames = (req, res) => {
  const moment = require("moment");
const { Op } = require("sequelize");
  
  Game.findAll({
    where: {
      gameDate: {
        [Op.gte]: moment().toDate(),
      },
    },
    limit: 9,
    order: [["startTime", "ASC"]],
  }).then((newGame) => {
    if (!newGame) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      newGame,
    });
  });
};


exports.findAllNewGames = (req, res) => {
  const moment = require("moment");
  const { Op } = require("sequelize");
  Game.findAll({
    where: {
      gameDate: {
        [Op.gte]: moment().toDate(),
      },
    },
    limit: 100,
    order: [["createdAt", "ASC"]],
  }).then((allNewGame) => {
    if (!allNewGame) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      allNewGame,
    });
  });
};

//お気に入りチームの試合検索
exports.findFavoriteTeamGames = (req, res) => {
  const { Op } = require("sequelize");
  Game.findAll({
    where: {
      [Op.or]: [
        { homeTeamId: req.query.teamName },
        { awayTeamId: req.query.teamName },
      ],
    },
  }).then((game) => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game,
    });
  });
};

//該当チームの試合検索
exports.findTeamGames = (req, res) => {
  const { Op } = require("sequelize");
  Game.findAll({
    where: {
      [Op.or]: [
        { homeTeamId: req.query.teamName },
        { awayTeamId: req.query.teamName },
      ],

    },
    limit: 9,
    order: [["startTime", "ASC"]],
  }).then((teamGame) => {
    if (!teamGame) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      teamGame,
    });
  });
};

// 該当チームのレビュー一覧取得
exports.findTeamReview = (req, res) => {
  const { Op } = require("sequelize");
  console.log(req.query);
  Game.findAll({
    include: {
      model: db.reviews,
    },
    where: {
      [Op.or]: [{ homeTeamId: req.query.id }, { awayTeamId: req.query.id }],
    },
  }).then((game) => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game,
    });
  });
};
// 該当スタジアムのレビュー一覧取得
exports.findStadiumReview = (req, res) => {
  console.log(req.query);
  Game.findAll({
    include: {
      model: db.reviews,
    },
    where: {
      stadiumId: req.query.id,
    },
  }).then((stadium) => {
    if (!stadium) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      stadium,
    });
  });
};

exports.findGameDetail = (req, res) => {
  //  console.log(req.headers);
  Game.findOne({
    where: {
      id: req.query.id,
    },
  }).then((game) => {
    if (!game) {
      return res.status(404).send({ message: "Game Not found." });
    }
    return res.status(200).json({
      game,
    });
  });
};
