module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    profile: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },

    favoriteSport: {
      type: Sequelize.STRING,
    },

    favoriteStadium: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
