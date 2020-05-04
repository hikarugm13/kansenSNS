module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("reviews", {
    gameId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    userName: {
      type: Sequelize.STRING,
    },
    review: {
      type: Sequelize.STRING(1500),
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Review;
};
