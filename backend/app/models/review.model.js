module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("reviews", {
    gameId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
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
