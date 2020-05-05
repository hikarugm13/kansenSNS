const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models");

db.sequelize.sync({ force: false, alter: true });




app.get('/', (req, res) => {
  res.json({ message: "Welcome00000000 to bezkoder application." });
})

require('./app/routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../sportssns/dist'))
}