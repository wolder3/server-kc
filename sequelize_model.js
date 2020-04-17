const Sequelize = require("sequelize");
const ContactoModel = require("./models/Contacto");
const ReferenciaModel = require("./models/Referencia");
const { IP_DB, NAME_DB, USER_DB, PASS_DB, DIALECT_DB } = require("./config");

const sequelize = new Sequelize(`${NAME_DB}`, `${USER_DB}`, `${PASS_DB}`, {
  host: `${IP_DB}`,
  dialect: `${DIALECT_DB}`,
  define: {
    freezeTableName: true, // Do not change my table names.
    timestamps: false, // I will do this individually, thanks.
  },
});

const Contacto = ContactoModel(sequelize, Sequelize);
const Referencia = ReferenciaModel(sequelize, Sequelize);

// sequelize.sync({
//   force: true,
// });

module.exports = {
  Contacto,
  Referencia,
};
