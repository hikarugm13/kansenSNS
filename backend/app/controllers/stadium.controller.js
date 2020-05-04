const db = require("../models");
const Stadium = db.stadiums;


exports.findStadiumDetail = (req, res) => {
  //  console.log(req.headers);
  Stadium.findOne({
    where: {
      id: req.query.stadiumId,
    }
  }).then(stadium => {
    if (!stadium) {
      return res.status(404).send({ message: "Stadium Not found." });
    }
    return res.status(200).json({
      stadium
    });
  });
};






exports.getGameReview = (req, res) => {
  //  console.log(req.headers);
  Stadium.findAll({
    // include: {
    //   model: db.game
    // },
    where: {
      id: req.query.stadiumId,
    },
  }).then((stadium) => {
    if (!stadium) {
      return res.status(404).send({ message: "Stadium Not found." });
    }
    return res.status(200).json({
      stadium,
    });
  });
};

