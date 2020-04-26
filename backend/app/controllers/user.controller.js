const db = require("../models");
const User = db.user;

exports.find = (req, res) => {
    User.findOne({
      where: {
        id: req.id
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      return res.status(200).json({
        title: "login success",
        user: {
          email: user.email,
          username: user.username,
          password: user.password,
          gender: user.gender,
          profile: user.profile,
          image: user.image,
        }
      });
    });
  
};

exports.updateProfile = (req, res) => {
  console.log(req)
  User.update({
    email: req.body.email,
    username: req.body.username,
    gender: req.body.gender,
    profile: req.body.profile,
    image: req.body.image
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
}