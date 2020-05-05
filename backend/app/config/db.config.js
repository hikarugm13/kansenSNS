module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "kansenSNS",
  // HOST: "us-cdbr-east-06.cleardb.net",
  // USER: "b6194dce0578b7",
  // PASSWORD: "78f325a9",
  // DB: "heroku_bc56757a6ce7c01",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
