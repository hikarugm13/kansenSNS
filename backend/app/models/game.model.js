module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("games", {
    sportsName: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    },
    league: {
      type: Sequelize.STRING,
    },
    gameDate: {
      type: Sequelize.DataTypes.DATEONLY,
    },
    startTime: {
      type: Sequelize.STRING,
    },
    endTime: {
      type: Sequelize.STRING,
    },
    homeTeamId: {
      type: Sequelize.STRING,
    },
    awayTeamId: {
      type: Sequelize.STRING,
    },
    stadiumId: {
      type: Sequelize.STRING,
    },
    stadiumName: {
      type: Sequelize.STRING,
    },
    broadcaster: {
      type: Sequelize.STRING,
    },
  });

  return Game;
};
