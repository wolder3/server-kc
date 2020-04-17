const Sequelize = require("sequelize");
const app = require("./app");
const port = process.env.Port || 3979;
const {
  API_VERSION,
  IP_SERVER,
  IP_DB,
  NAME_DB,
  USER_DB,
  PASS_DB,
  DIALECT_DB,
} = require("./config");

//const sequelize = new Sequelize("postgres://user:pass@example.com:5432/dbname");

const sequelize = new Sequelize(`${NAME_DB}`, `${USER_DB}`, `${PASS_DB}`, {
  host: `${IP_DB}`,
  dialect: `${DIALECT_DB}`,
});

var server = app.listen(port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    console.log("Listening on port " + server.address().port);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
