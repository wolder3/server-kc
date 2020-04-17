const { Contacto } = require("../sequelize_model");

async function createContacto(req, res) {
  const {
    nombres_apellidos,
    empresa,
    email,
    telefono,
    mensaje,
    geolocalizacion,
    fecharegistro,
    fechamodificacion,
    id_referencia,
  } = req.body;

  let maxid = 0;

  await Contacto.max("id_contacto")
    .then(function (id) {
      maxid = parseInt(id) + 1;
    })
    .error(function (error) {
      maxid = -1;
      res.status(500).send(error);
    });

  if (maxid < 0) {
    return res.status(500).send("Error al obtener el maximo id de contactos.");
  }

  return Contacto.create({
    id_contacto: maxid,
    nombres_apellidos: nombres_apellidos,
    empresa: empresa,
    email: email.toLowerCase(),
    telefono: telefono,
    mensaje: mensaje,
    geolocalizacion: geolocalizacion,
    fecharegistro: fecharegistro,
    fechamodificacion: fechamodificacion,
    Referencia_id_referencia: id_referencia,
  })
    .then((contacto) => res.status(200).send(contacto))
    .catch((error) => res.status(500).send(error));
}

function listContacto(req, res) {
  return Contacto.findAll()
    .then((contactos) => res.status(200).send(contactos))
    .catch((error) => res.status(500).send(error));
}

async function deleteContacto(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Contacto.destroy({
      where: { id_contacto: id },
    });

    if (deleted) {
      return res
        .status(200)
        .send({ message: "Contacto eliminado satisfactoriamente." });
    }

    throw new Error("Contacto no encontrado");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function updateContacto(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Contacto.update(req.body, {
      where: { id_contacto: id },
    });
    if (updated) {
      const updatedPost = await Contacto.findOne({
        where: { id_contacto: id },
      });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Contacto no encontrado");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function getContactoById(req, res) {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findOne({
      where: { id_contacto: id },
    });

    if (contacto) {
      return res.status(200).json({ contacto });
    }

    return res.status(404).send({ message: "Id de contacto no existe" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
module.exports = {
  createContacto,
  listContacto,
  deleteContacto,
  updateContacto,
  getContactoById,
};
