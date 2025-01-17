const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { API_VERSION } = require("./config");

// Load routing
const contactoRoutes = require("./routers/contacto");
const referenciaRoutes = require("./routers/referencia");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router Basic
app.use(`/api/${API_VERSION}`, contactoRoutes);
app.use(`/api/${API_VERSION}`, referenciaRoutes);

module.exports = app;
