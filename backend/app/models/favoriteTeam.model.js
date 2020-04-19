module.exports = (sequelize, Sequelize) => {
  const favoriteTeam = sequelize.define("favoriteTeam", {
    userId: {
      type: Sequelize.STRING,
    },
    teamId: {
      type: Sequelize.STRING,
    },
    teamName: {
      type: Sequelize.STRING,
    },
  });

  return favoriteTeam;
};
