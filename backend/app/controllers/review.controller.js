const db = require("../models");
const Review = db.reviews;

exports.postReview = (req, res) => {
  Review.create({
    gameId: req.body.gameId,
    userName: req.body.userName,
    review: req.body.review,
    image: req.body.image,
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your review was posted successfully!" });
};

exports.getReview = (req, res) => {
  console.log(req);
  //  console.log(req.headers);
  Review.findAll({
    where: {
      gameId: req.query.id,
    },
  }).then((review) => {
    if (!review) {
      return res.status(404).send({ message: "Review Not found." });
    }
    return res.status(200).json({
      review,
    });
  });
};
