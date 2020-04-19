const db = require("../models");
const Team = db.teams;

exports.getTeamInfo = (req, res) => {

  //  console.log(req.headers);
  Team.findOne({
    where: {
      teamName: req.query.teamName,
    },
  }).then((team) => {
    if (!team) {
      return res.status(404).send({ message: "Team Not found." });
    }
    return res.status(200).json({
      team,
    });
  });
};