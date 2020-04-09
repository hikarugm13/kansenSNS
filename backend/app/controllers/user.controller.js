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
          name: user.username,
          password: user.password
        }
      });
    });
  
};