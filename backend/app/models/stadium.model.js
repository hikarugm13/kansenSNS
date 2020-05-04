module.exports = (sequelize, Sequelize) => {
  const Stadiums = sequelize.define("stadiums", {
    stadiumName: {
      type: Sequelize.STRING,
    },
    stadiumAddress: {
      type: Sequelize.STRING,
    },
    capacity: {
      type: Sequelize.INTEGER,
    },
    roofInfo: {
      type: Sequelize.STRING,
    },
    seatInfo: {
      type: Sequelize.STRING,
    },
  });

  return Stadiums;
};
