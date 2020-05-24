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
    howToWatch: {
      type: Sequelize.STRING,
    },
    barName: {
      type: Sequelize.STRING,
    },
    review: {
      type: Sequelize.STRING(1500),
    },
    review: {
      type: Sequelize.STRING(1500),
    },
    stadiumReview: {
      type: Sequelize.STRING(1500),
    },
    foodReview: {
      type: Sequelize.STRING(1500),
    },
    mascot: {
      type: Sequelize.STRING(1500),
    },
    barReview: {
      type: Sequelize.STRING(1500),
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Review;
};
