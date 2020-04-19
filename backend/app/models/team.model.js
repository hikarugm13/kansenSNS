module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("teams", {
    teamName: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    },
    sportsName: {
      type: Sequelize.STRING,
    },
 
  });

  return Team;
};
