const { Referencia } = require("../sequelize_model");

async function createReferencia(req, res) {
  const { description } = req.body;

  let maxid = 0;

  await Referencia.max("id_referencia")
    .then(function (id) {
      maxid = parseInt(id) + 1;
    })
    .error(function (error) {
      maxid = -1;
      res.status(500).send(error);
    });

  if (maxid < 0) {
    return res
      .status(500)
      .send("Error al obtener el maximo id de referencias.");
  }

  return Referencia.create({
    id_referencia: maxid,
    descripcion: description,
  })
    .then((referencia) => res.status(200).send(referencia))
    .catch((error) => res.status(500).send(error));
}

function listReferencia(req, res) {
  return Referencia.findAll()
    .then((referencias) => res.status(200).send(referencias))
    .catch((error) => res.status(500).send(error));
}

async function deleteReferencia(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Referencia.destroy({
      where: { id_referencia: id },
    });

    if (deleted) {
      return res
        .status(200)
        .send({ message: "Referencia eliminado satisfactoriamente." });
    }

    throw new Error("Referencia no encontrado");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function updateReferencia(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Referencia.update(req.body, {
      where: { id_referencia: id },
    });
    if (updated) {
      const updatedPost = await Referencia.findOne({
        where: { id_referencia: id },
      });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Referencia no encontrado");
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function getReferenciaById(req, res) {
  try {
    const { id } = req.params;
    const referencia = await Referencia.findOne({
      where: { id_referencia: id },
    });

    if (referencia) {
      return res.status(200).json({ referencia });
    }

    return res.status(404).send({ message: "Id de referencia no existe" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
module.exports = {
  createReferencia,
  listReferencia,
  deleteReferencia,
  updateReferencia,
  getReferenciaById,
};
