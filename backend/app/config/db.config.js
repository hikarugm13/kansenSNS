module.exports = {
  // HOST: "localhost",
  // USER: "root",
  // PASSWORD: "",
  // DB: "kansenSNS",
  HOST: "us-cdbr-east-06.cleardb.net",
  USER: "bf1c8171de7ece",
  PASSWORD: "b9b42856",
  DB: "heroku_677547484182aa3",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
