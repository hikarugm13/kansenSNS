const db = require("../models");
const Review = db.reviews;

exports.postReview = (req, res) => {
  Review.create({
    gameId: req.body.gameId,
    userId: req.body.userId,
    userName: req.body.userName,
    review: req.body.review,
    image: req.body.image,
    howToWatch: req.body.howToWatch,
    stadiumReview: req.body.stadiumReview,
    foodReview: req.body.foodReview,
    mascot: req.body.mascot,
    barName: req.body.barName,
    barReview: req.body.barReview,
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your review was posted successfully!" });
};

//update
exports.updateReview = (req, res) => {
  //  console.log(req.headers);
  Review.update(
    {
      gameId: req.body.gameId,
      userId: req.body.userId,
      review: req.body.review,
      image: req.body.image,
      owToWatch: req.body.howToWatch,
      stadiumReview: req.body.stadiumReview,
      foodReview: req.body.foodReview,
      mascot: req.body.mascot,
      barName: req.body.barName,
      barReview: req.body.barReview,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your review was posted successfully!" });
};
//delete
exports.deleteReview = (req, res) => {
  //  console.log(req.headers);
  Review.destroy({
    where: {
      id: req.body.id,
    },
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your deleted posted successfully!" });
};

//10レビューを取得
exports.getTenReview = (req, res) => {
  //  console.log(req.headers);
  Review.findAll({
    include: {
      model: db.game,
    },
    limit: 9,
    order: [["createdAt", "DESC"]],
  }).then((review) => {
    if (!review) {
      return res.status(404).send({ message: "Review Not found." });
    }
    return res.status(200).json({
      review,
    });
  });
};
//全てのレビューを取得
exports.getAllReview = (req, res) => {
  //  console.log(req.headers);
  Review.findAll({
    include: {
      model: db.game,
    },
    limit: 100,
    order: [["createdAt", "DESC"]],
  }).then((review) => {
    if (!review) {
      return res.status(404).send({ message: "Review Not found." });
    }
    return res.status(200).json({
      review,
    });
  });
};

// 該当試合のレビュー一覧取得
exports.getGameReview = (req, res) => {
  //  console.log(req.headers);
  Review.findAll({
    include: {
      model: db.game,
    },
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

//自分のレビュー
exports.getMyReview = (req, res) => {
   console.log(req.headers);
  Review.findAll({
    include: {
      model: db.game,
    },
    where: {
      userId: req.query.id,
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

exports.showReviewDetail = (req, res) => {
  console.log(req.query.id);
  //  console.log(req.headers);
  Review.findOne({
    include: {
      model: db.game,
    },
    where: {
      id: req.query.id,
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
