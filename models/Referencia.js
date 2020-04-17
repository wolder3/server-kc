module.exports = (sequelize, type) => {
  return sequelize.define("Referencia", {
    id_referencia: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    descripcion: type.STRING,
  });
};
