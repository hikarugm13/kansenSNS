const db = require("../models");
const User = db.user;

exports.find = (req, res) => {
  User.findOne({
    where: {
      id: req.id,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    return res.status(200).json({
      title: "login success",
      user,
    });
  });
};
exports.findSupporterInfo= (req, res) => {
  User.findOne({
    where: {
      id: req.query.id,
    },
  }).then((supporter) => {
    if (!supporter) {
      return res.status(404).send({ message: "User Not found." });
    }
    return res.status(200).json({
      supporter,
    });
  });
};

exports.updateProfile = (req, res) => {
  console.log(req);
  User.update(
    {
      email: req.body.email,
      username: req.body.username,
      gender: req.body.gender,
      profile: req.body.profile,
      image: req.body.image,
      favoriteSport: req.body.favoriteSport,
      favoriteStadium: req.body.favoriteStadium,
    },
    {
      where: {
        id: req.id,
      },
    }
  ).catch((err) => {
    res.status(500).send({ message: err.message });
  });
  return res.send({ message: "your profile was updated successfully!" });
};
