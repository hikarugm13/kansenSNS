module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("games", {
    sportsName: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    league: {
      type: Sequelize.STRING
    },
    gameDate: {
      type: Sequelize.STRING
    },
    homeTeamId: {
      type: Sequelize.STRING
    },
    awayTeamId: {
      type: Sequelize.STRING
    },
    stadiumId: {
      type: Sequelize.STRING
    }
  });

  return Game;
};
