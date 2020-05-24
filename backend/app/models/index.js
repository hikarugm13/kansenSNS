const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.game = require("../models/game.model.js")(sequelize, Sequelize);
db.reviews = require("../models/review.model.js")(sequelize, Sequelize);
db.teams = require("../models/team.model.js")(sequelize, Sequelize);
db.stadiums = require("../models/stadium.model.js")(sequelize, Sequelize);
db.favoriteTeam = require("../models/favoriteTeam.model.js")(
  sequelize,
  Sequelize
);

db.game.hasMany(db.reviews)
db.reviews.belongsTo(db.game);
db.user.hasMany(db.reviews)
db.reviews.belongsTo(db.user);

//userはbelongstoManyっぽい


module.exports = db;
