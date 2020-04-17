module.exports = (sequelize, type) => {
  return sequelize.define("Contacto", {
    id_contacto: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    nombres_apellidos: type.STRING,
    empresa: type.STRING,
    email: type.STRING,
    telefono: type.STRING,
    mensaje: type.TEXT,
    geolocalizacion: type.STRING,
    fecharegistro: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    fechamodificacion: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    Referencia_id_referencia: type.INTEGER,
  });
};
